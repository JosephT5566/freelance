import {
	BufferGeometry, Color, Float32BufferAttribute, Group, LineSegments, Mesh,
	OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, Vector4, WebGLRenderer,
} from 'three';

import { createTerrain, terrainHeight } from './heroTerrain';
import { contourFragmentShader, contourVertexShader, surfaceFragmentShader, surfaceVertexShader } from './heroTerrainShaders';

export const terrain = createTerrain(42);

type Ripple = Readonly<{ origin: Vector2; emittedAt: number; strength: number }>;
const maxRipples = 6;
const rippleLifetime = 1.8;

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
		uViewport: { value: new Vector2(1, 1) },
		uRipples: { value: Array.from({ length: maxRipples }, () => new Vector4()) },
		uShadow: { value: new Color('#254b60') },
		uHighlight: { value: new Color('#ad9472') },
	};
	const surfaceGeometry = new PlaneGeometry(1680, 1140, 168, 114);
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
				const subdivisions = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 5));
				for (let segment = 0; segment < subdivisions; segment++) {
					for (const fraction of [segment / subdivisions, (segment + 1) / subdivisions]) {
						const x = a.x + (b.x - a.x) * fraction;
						const y = a.y + (b.y - a.y) * fraction;
						vertices.push(x - 720, 450 - y, z);
						appendNormal(normals, x, y);
					}
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
	const motion = window.matchMedia('(min-width: 721px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
	const normalizedPointer = new Vector2();
	const offset = new Vector2();
	const target = new Vector2();
	const imageOffset = new Vector2();
	const imageTarget = new Vector2();
	let ripples: Ripple[] = [];
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
		const now = time / 1000;
		ripples = ripples.filter((ripple) => now - ripple.emittedAt < rippleLifetime);
		for (let index = 0; index < maxRipples; index++) {
			const ripple = ripples[index];
			uniforms.uRipples.value[index].set(ripple?.origin.x ?? 0, ripple?.origin.y ?? 0,
				ripple ? now - ripple.emittedAt : 0, ripple?.strength ?? 0);
		}
		const moving = offset.distanceTo(target) > .001 || imageOffset.distanceTo(imageTarget) > .001;
		if (!moving) {
			offset.copy(target);
			imageOffset.copy(imageTarget);
		}
		image.style.transform = `translate3d(${-imageOffset.x * 8}px, ${imageOffset.y * 8}px, 0)`;
		draw();
		if (moving || ripples.length) schedule();
		else lastTime = 0;
	}
	function reset() {
		target.set(0, 0);
		offset.set(0, 0);
		imageOffset.set(0, 0);
		imageTarget.set(0, 0);
		ripples = [];
		for (const ripple of uniforms.uRipples.value) ripple.set(0, 0, 0, 0);
		lastTime = 0;
		image.style.removeProperty('transform');
	}
	function onPointer(event: PointerEvent) {
		if (!motion.matches || document.hidden || lost || event.pointerType !== 'mouse') return;
		normalizedPointer.set(event.clientX / width * 2 - 1, 1 - event.clientY / height * 2);
		const origin = new Vector2(event.clientX, height - event.clientY);
		const now = performance.now() / 1000;
		ripples = ripples.filter((ripple) => now - ripple.emittedAt < rippleLifetime);
		const previous = ripples[ripples.length - 1];
		if (ripples.length < maxRipples && (!previous || (now - previous.emittedAt >= rippleLifetime / maxRipples && origin.distanceTo(previous.origin) >= 12))) {
			ripples.push({ origin, emittedAt: now, strength: 1 });
		}
		target.copy(normalizedPointer);
		const bounds = hero.getBoundingClientRect();
		if (event.clientY >= bounds.top && event.clientY <= bounds.bottom) {
			imageTarget.set(normalizedPointer.x, 1 - (event.clientY - bounds.top) / bounds.height * 2);
		} else imageTarget.set(0, 0);
		schedule();
	}
	function onLeave() {
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
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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
		surfaceGeometry.dispose();
		surfaceMaterial.dispose();
		renderer.dispose();
	};
}
