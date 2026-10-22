export type Point = Readonly<{ x: number; y: number }>;
export type Contour = Readonly<{ level: number; major: boolean; closed: boolean; points: readonly Point[]; path: string }>;
export type Terrain = Readonly<{ viewBox: string; contours: readonly Contour[] }>;

type Crossing = { point: Point; neighbors: string[] };

export function contourPath(points: readonly Point[], closed: boolean) {
	return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ') + (closed ? 'Z' : '');
}

function valueNoise(x: number, y: number, seed: number) {
	const column = Math.floor(x);
	const row = Math.floor(y);
	const smooth = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);
	const blend = (a: number, b: number, weight: number) => a + (b - a) * weight;
	const hash = (px: number, py: number) => {
		let value = Math.imul(px, 374761393) ^ Math.imul(py, 668265263) ^ seed;
		value = Math.imul(value ^ (value >>> 13), 1274126177);
		return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
	};
	const tx = smooth(x - column);
	const ty = smooth(y - row);
	return blend(blend(hash(column, row), hash(column + 1, row), tx), blend(hash(column, row + 1), hash(column + 1, row + 1), tx), ty);
}

function traceLevel(values: readonly (readonly number[])[], level: number, major: boolean, step: number, margin: number): Contour[] {
	const crossings = new Map<string, Crossing>();
	const columns = values[0].length;
	for (let row = 0; row < values.length - 1; row++) {
		for (let column = 0; column < columns - 1; column++) {
			const corners = [
				{ column, row }, { column: column + 1, row },
				{ column: column + 1, row: row + 1 }, { column, row: row + 1 },
			];
			const heights = corners.map((corner) => values[corner.row][corner.column] - level);
			const edges: string[] = [];
			for (let edge = 0; edge < 4; edge++) {
				const next = (edge + 1) % 4;
				if ((heights[edge] >= 0) === (heights[next] >= 0)) continue;
				const start = corners[edge];
				const end = corners[next];
				const startId = start.row * columns + start.column;
				const endId = end.row * columns + end.column;
				const key = `${Math.min(startId, endId)}:${Math.max(startId, endId)}`;
				if (!crossings.has(key)) {
					const fraction = heights[edge] / (heights[edge] - heights[next]);
					crossings.set(key, {
						point: {
							x: (start.column + (end.column - start.column) * fraction) * step - margin,
							y: (start.row + (end.row - start.row) * fraction) * step - margin,
						},
						neighbors: [],
					});
				}
				edges.push(key);
			}
			const connect = (a: string, b: string) => {
				crossings.get(a)?.neighbors.push(b);
				crossings.get(b)?.neighbors.push(a);
			};
			if (edges.length === 2) connect(edges[0], edges[1]);
			if (edges.length === 4) {
				// The bilinear saddle decides which regions connect without crossing lines.
				const q = heights[0] * heights[2] - heights[1] * heights[3];
				if (q >= 0) {
					connect(edges[0], edges[1]);
					connect(edges[2], edges[3]);
				} else {
					connect(edges[0], edges[3]);
					connect(edges[1], edges[2]);
				}
			}
		}
	}
	const contours: Contour[] = [];
	const visited = new Set<string>();
	const walk = (start: string) => {
		if (visited.has(start)) return;
		const points: Point[] = [];
		let current: string | undefined = start;
		let previous: string | undefined;
		let closed = false;
		while (current !== undefined) {
			if (visited.has(current)) {
				closed = current === start;
				break;
			}
			const crossing = crossings.get(current);
			if (!crossing) break;
			visited.add(current);
			points.push(crossing.point);
			const next: string | undefined = crossing.neighbors.find((neighbor) => neighbor !== previous);
			previous = current;
			current = next;
		}
		if (points.length > 1) contours.push({ level, major, closed, points, path: contourPath(points, closed) });
	};
	for (const [key, crossing] of crossings) if (crossing.neighbors.length === 1) walk(key);
	for (const key of crossings.keys()) walk(key);
	return contours;
}

export function terrainHeight(x: number, y: number, seed: number) {
	const u = (x + y * .32) / 470;
	const v = (y - x * .24) / 470;
	const noise = valueNoise(u, v, seed) * .65 + valueNoise(u * 2, v * 2, seed + 1) * .23 + valueNoise(u * 4, v * 4, seed + 2) * .07;
	const ridge = Math.exp(-Math.pow((x - 690 - 140 * Math.sin(y / 300)) / 410, 2) - Math.pow((y - 310) / 530, 2));
	return noise + ridge * .7 + x / 1440 * .12;
}

export function createTerrain(seed: number): Terrain {
	const step = 12;
	const margin = 24;
	const values = Array.from({ length: (900 + margin * 2) / step + 1 }, (_, row) =>
		Array.from({ length: (1440 + margin * 2) / step + 1 }, (_, column) => {
			const x = column * step - margin;
			const y = row * step - margin;
			return terrainHeight(x, y, seed);
		}),
	);
	const heights = values.flat();
	const min = Math.min(...heights);
	const max = Math.max(...heights);
	const contours = Array.from({ length: 15 }, (_, index) =>
		traceLevel(values, min + (max - min) * (index + 1) / 16, index % 5 === 0, step, margin),
	).flat();
	return { viewBox: '0 0 1440 900', contours };
}
