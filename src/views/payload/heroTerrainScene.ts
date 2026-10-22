import {
	BufferGeometry, Color, Float32BufferAttribute, Group, LineSegments, Mesh,
	OrthographicCamera, PlaneGeometry, Points, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer,
} from 'three';

import { createTerrain, terrainHeight } from './heroTerrain';
import { contourFragmentShader, contourVertexShader, particleFragmentShader, particleVertexShader, surfaceFragmentShader, surfaceVertexShader } from './heroTerrainShaders';

export const terrain = createTerrain(42);

export function mountTerrainScene({ canvas, hero, image, onUnavailable }: {
	canvas: HTMLCanvasElement;
	hero: HTMLElement;
	image: HTMLImageElement;
	onUnavailable: () => void;
}): () => void {
	let renderer: WebGLRenderer;
	try {
		renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
	} catch {
		onUnavailable();
		return () => {};
	}
	renderer.setClearColor('#f1ece8', 0);
	const scene = new Scene();
	const group = new Group();
	scene.add(group);
	const camera = new OrthographicCamera(-720, 720, 450, -450, 1, 4000);
	camera.position.z = 2000;
	const levels = terrain.contours.map((contour) => contour.level);
	const minLevel = Math.min(...levels);
	const levelRange = Math.max(...levels) - minLevel;
	const uniforms = {
		uPointer: { value: new Vector2(-1000, -1000) },
		uViewport: { value: new Vector2(1, 1) },
		uRadius: { value: 150 },
		uActivation: { value: 0 },
		uPixelRatio: { value: 1 },
		uShadow: { value: new Color('#254b60') },
		uHighlight: { value: new Color('#ad9472') },
	};
	const surfaceGeometry = new PlaneGeometry(1680, 1140, 120, 75);
	const surfacePositions = surfaceGeometry.getAttribute('position');
	for (let index = 0; index < surfacePositions.count; index++) {
		const x = surfacePositions.getX(index) + 720;
		const y = 450 - surfacePositions.getY(index);
		surfacePositions.setZ(index, (terrainHeight(x, y, 42) - minLevel) / levelRange * 320 - 160);
	}
	surfaceGeometry.computeVertexNormals();
	const surfaceMaterial = new ShaderMaterial({
		uniforms, vertexShader: surfaceVertexShader, fragmentShader: surfaceFragmentShader,
		transparent: true, depthWrite: false, depthTest: false,
	});
	const surface = new Mesh(surfaceGeometry, surfaceMaterial);
	surface.renderOrder = -1;
	group.add(surface);
	const particlePositions: number[] = [];
	const particleNormals: number[] = [];
	const scatter: number[] = [];
	const normal = new Vector3();
	function appendNormal(destination: number[], x: number, y: number) {
		const dx = (terrainHeight(x + 2, y, 42) - terrainHeight(x - 2, y, 42)) * 80 / levelRange;
		const dy = (terrainHeight(x, y + 2, 42) - terrainHeight(x, y - 2, 42)) * 80 / levelRange;
		normal.set(-dx, dy, 1).normalize();
		destination.push(normal.x, normal.y, normal.z);
	}
	const lines = [false, true].map((major) => {
		const vertices: number[] = [];
		const normals: number[] = [];
		for (const contour of terrain.contours) {
			if (contour.major !== major) continue;
			const z = (contour.level - minLevel) / levelRange * 320 - 160;
			const count = contour.points.length;
			for (let index = 0; index < count - (contour.closed ? 0 : 1); index++) {
				const a = contour.points[index];
				const b = contour.points[(index + 1) % count];
				vertices.push(a.x - 720, 450 - a.y, z, b.x - 720, 450 - b.y, z);
				appendNormal(normals, a.x, a.y);
				appendNormal(normals, b.x, b.y);
				const samples = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 5));
				for (let sample = 0; sample < samples; sample++) {
					const fraction = sample / samples;
					const x = a.x + (b.x - a.x) * fraction;
					const y = a.y + (b.y - a.y) * fraction;
					particlePositions.push(x - 720, 450 - y, z);
					appendNormal(particleNormals, x, y);
					const seed = x * 12.9898 + y * 78.233 + z * 3.17;
					scatter.push(Math.sin(seed) * 18, Math.sin(seed * 1.73) * 18, Math.cos(seed * 2.31) * 32);
				}
			}
		}
		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		geometry.setAttribute('terrainNormal', new Float32BufferAttribute(normals, 3));
		const material = new ShaderMaterial({
			uniforms: { ...uniforms, uOpacity: { value: major ? .34 : .23 } },
			vertexShader: contourVertexShader, fragmentShader: contourFragmentShader,
			transparent: true, depthWrite: false, depthTest: false,
		});
		const line = new LineSegments(geometry, material);
		line.frustumCulled = false;
		group.add(line);
		return { geometry, material };
	});
	const particleGeometry = new BufferGeometry();
	particleGeometry.setAttribute('position', new Float32BufferAttribute(particlePositions, 3));
	particleGeometry.setAttribute('terrainNormal', new Float32BufferAttribute(particleNormals, 3));
	particleGeometry.setAttribute('scatter', new Float32BufferAttribute(scatter, 3));
	const particleMaterial = new ShaderMaterial({
		uniforms, vertexShader: particleVertexShader, fragmentShader: particleFragmentShader,
		transparent: true, depthWrite: false, depthTest: false,
	});
	const particles = new Points(particleGeometry, particleMaterial);
	particles.frustumCulled = false;
	group.add(particles);
	const motion = window.matchMedia('(min-width: 721px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
	const normalizedPointer = new Vector2();
	const offset = new Vector2();
	const target = new Vector2();
	const imageOffset = new Vector2();
	const imageTarget = new Vector2();
	let activationTarget = 0;
	let frame = 0;
	let lastTime = 0;
	let lost = false;
	let width = 1;
	let height = 1;

	function draw() {
		group.rotation.set(.64 + offset.y * .035, -.12 + offset.x * .045, -.09);
		renderer.render(scene, camera);
	}
	function schedule() {
		if (!frame && !document.hidden && !lost) frame = requestAnimationFrame(tick);
	}
	function tick(time: number) {
		frame = 0;
		const elapsed = lastTime ? Math.min(64, time - lastTime) : 16;
		lastTime = time;
		const easing = 1 - Math.exp(-elapsed / 110);
		offset.lerp(target, easing);
		imageOffset.lerp(imageTarget, easing);
		uniforms.uActivation.value += (activationTarget - uniforms.uActivation.value) * easing;
		const moving = offset.distanceTo(target) > .001 || imageOffset.distanceTo(imageTarget) > .001 || Math.abs(uniforms.uActivation.value - activationTarget) > .001;
		if (!moving) {
			offset.copy(target);
			imageOffset.copy(imageTarget);
			uniforms.uActivation.value = activationTarget;
		}
		image.style.transform = `translate3d(${-imageOffset.x * 8}px, ${imageOffset.y * 8}px, 0)`;
		draw();
		if (moving) schedule();
		else lastTime = 0;
	}
	function reset() {
		target.set(0, 0);
		offset.set(0, 0);
		imageOffset.set(0, 0);
		imageTarget.set(0, 0);
		activationTarget = 0;
		uniforms.uActivation.value = 0;
		lastTime = 0;
		image.style.removeProperty('transform');
	}
	function onPointer(event: PointerEvent) {
		if (!motion.matches || document.hidden || lost || event.pointerType !== 'mouse') return;
		normalizedPointer.set(event.clientX / width * 2 - 1, 1 - event.clientY / height * 2);
		uniforms.uPointer.value.set(event.clientX, height - event.clientY);
		target.copy(normalizedPointer);
		const bounds = hero.getBoundingClientRect();
		if (event.clientY >= bounds.top && event.clientY <= bounds.bottom) {
			imageTarget.set(normalizedPointer.x, 1 - (event.clientY - bounds.top) / bounds.height * 2);
		} else imageTarget.set(0, 0);
		activationTarget = 1;
		schedule();
	}
	function onLeave() {
		activationTarget = 0;
		target.set(0, 0);
		imageTarget.set(0, 0);
		schedule();
	}
	function onResize() {
		if (lost) return;
		width = Math.max(1, canvas.clientWidth);
		height = Math.max(1, canvas.clientHeight);
		const scale = Math.min(1440 / width, 690 / height) / 1.2;
		camera.left = -width * scale / 2;
		camera.right = width * scale / 2;
		camera.top = height * scale / 2;
		camera.bottom = -height * scale / 2;
		camera.updateProjectionMatrix();
		uniforms.uViewport.value.set(width, height);
		uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5);
		renderer.setPixelRatio(uniforms.uPixelRatio.value);
		renderer.setSize(width, height, false);
		reset();
		schedule();
	}
	function onScroll() {
		imageTarget.set(0, 0);
		imageOffset.set(0, 0);
		image.style.removeProperty('transform');
	}
	function onMotion() {
		reset();
		schedule();
	}
	function onVisibility() {
		cancelAnimationFrame(frame);
		frame = 0;
		reset();
		if (!document.hidden) schedule();
	}
	function onContextLost(event: Event) {
		event.preventDefault();
		lost = true;
		cancelAnimationFrame(frame);
		frame = 0;
		reset();
		onUnavailable();
	}
	const resizeObserver = new ResizeObserver(onResize);
	resizeObserver.observe(canvas);
	canvas.addEventListener('webglcontextlost', onContextLost);
	window.addEventListener('pointermove', onPointer, { passive: true });
	document.documentElement.addEventListener('pointerleave', onLeave, { passive: true });
	window.addEventListener('blur', onLeave);
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize, { passive: true });
	document.addEventListener('visibilitychange', onVisibility);
	motion.addEventListener('change', onMotion);
	onResize();
	return () => {
		cancelAnimationFrame(frame);
		resizeObserver.disconnect();
		canvas.removeEventListener('webglcontextlost', onContextLost);
		window.removeEventListener('pointermove', onPointer);
		document.documentElement.removeEventListener('pointerleave', onLeave);
		window.removeEventListener('blur', onLeave);
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('resize', onResize);
		document.removeEventListener('visibilitychange', onVisibility);
		motion.removeEventListener('change', onMotion);
		reset();
		for (const { geometry, material } of lines) {
			geometry.dispose();
			material.dispose();
		}
		particleGeometry.dispose();
		particleMaterial.dispose();
		surfaceGeometry.dispose();
		surfaceMaterial.dispose();
		renderer.dispose();
	};
}
