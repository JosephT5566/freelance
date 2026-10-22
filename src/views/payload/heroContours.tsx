import { useEffect, useRef, useState, type RefObject } from 'react';
import { makeStyles } from 'tss-react/mui';

import type { Terrain } from './heroTerrain';

const useStyles = makeStyles()({
	layer: {
		position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
	},
	canvas: { display: 'block', width: '100%', height: '100%' },
});

export default function HeroContours({ heroRef, imageRef }: {
	heroRef: RefObject<HTMLElement | null>;
	imageRef: RefObject<HTMLImageElement | null>;
}) {
	const { classes } = useStyles();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [fallback, setFallback] = useState<Terrain | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const hero = heroRef.current;
		const image = imageRef.current;
		if (!canvas || !hero || !image) return;
		let disposed = false;
		let dispose: (() => void) | undefined;
		import('./heroTerrainScene').then(({ mountTerrainScene, terrain }) => {
			if (disposed) return;
			dispose = mountTerrainScene({ canvas, hero, image, onUnavailable: () => setFallback(terrain) });
		}).catch(() => {});
		return () => {
			disposed = true;
			dispose?.();
		};
	}, [heroRef, imageRef]);

	return (
		<div className={classes.layer} aria-hidden="true" data-hero-contours="">
			<canvas ref={canvasRef} className={classes.canvas} style={{ visibility: fallback ? 'hidden' : 'visible' }} />
			{fallback && (
				<svg viewBox={fallback.viewBox} preserveAspectRatio="xMidYMid slice" focusable="false"
					style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none" stroke="#254251">
					{fallback.contours.map((contour, index) => (
						<path key={index} d={contour.path} fill="none" stroke="#254251" strokeOpacity={contour.major ? .18 : .12}
							strokeWidth={contour.major ? 1.2 : .8} vectorEffect="non-scaling-stroke" />
					))}
				</svg>
			)}
		</div>
	);
}
