import { useEffect, useRef, type RefObject } from 'react';
import { makeStyles } from 'tss-react/mui';

import { contourPath, createTerrain, type Point } from './heroTerrain';

const terrain = createTerrain(42);

const useStyles = makeStyles()({
	layer: {
		position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
		maskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 76%, transparent)',
	},
	svg: { position: 'absolute', inset: 0, width: '100%', height: '100%', fill: 'none', stroke: '#254251' },
});

export default function HeroContours({ heroRef, imageRef }: {
	heroRef: RefObject<HTMLElement | null>;
	imageRef: RefObject<HTMLImageElement | null>;
}) {
	const { classes } = useStyles();
	const layerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!heroRef.current || !imageRef.current || !layerRef.current || !svgRef.current) return;
		const hero = heroRef.current;
		const image = imageRef.current;
		const layer = layerRef.current;
		const header = document.querySelector('header');
		const experience = document.getElementById('experience');
		const motion = window.matchMedia('(min-width: 721px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
		const svg = svgRef.current;
		const paths = Array.from(svg.querySelectorAll('path'));
		let screenTransform = svg.getScreenCTM();
		let inverseTransform = screenTransform?.inverse();
		let bounds = hero.getBoundingClientRect();
		let headerBottom = 0;
		let width = document.documentElement.clientWidth;
		let height = window.innerHeight;
		let fade = 1;
		let experienceVisible = false;
		let needsMeasure = true;
		let frame = 0;
		let lastTime = 0;
		let pointer: Point | null = null;
		let energy = 0;
		let offset: Point = { x: 0, y: 0 };
		let target: Point = { x: 0, y: 0 };

		function restorePaths() {
			paths.forEach((path, index) => path.setAttribute('d', terrain.contours[index].path));
		}
		function reset() {
			pointer = null;
			energy = 0;
			offset = target = { x: 0, y: 0 };
			image.style.removeProperty('transform');
			restorePaths();
		}
		function measure() {
			bounds = hero.getBoundingClientRect();
			headerBottom = header?.getBoundingClientRect().bottom ?? 0;
			width = document.documentElement.clientWidth;
			height = window.innerHeight;
			screenTransform = svg.getScreenCTM();
			inverseTransform = screenTransform?.inverse();
			const progress = Math.max(0, Math.min(1, (bounds.bottom - headerBottom) / bounds.height));
			fade = progress * progress * (3 - 2 * progress);
			layer.style.opacity = String(experienceVisible ? 0 : fade);
			needsMeasure = false;
		}
		function active() {
			return motion.matches && !document.hidden && !experienceVisible && fade > 0 && bounds.top < height;
		}
		function schedule() {
			if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
		}
		function tick(time: number) {
			frame = 0;
			if (needsMeasure) measure();
			if (!active()) {
				reset();
				lastTime = 0;
				return;
			}
			const elapsed = lastTime ? Math.min(64, time - lastTime) : 16;
			lastTime = time;
			const easing = 1 - Math.exp(-elapsed / 90);
			offset = { x: offset.x + (target.x - offset.x) * easing, y: offset.y + (target.y - offset.y) * easing };
			const moving = Math.abs(target.x - offset.x) + Math.abs(target.y - offset.y) > .02;
			if (!moving) offset = target;
			image.style.transform = `translate3d(${offset.x.toFixed(3)}px, ${offset.y.toFixed(3)}px, 0)`;
			energy *= Math.exp(-elapsed / 180);
			if (pointer && energy > .002 && screenTransform && inverseTransform) {
				const currentPointer = pointer;
				const matrix = screenTransform;
				const inverse = inverseTransform;
				paths.forEach((path, index) => {
					const contour = terrain.contours[index];
					path.setAttribute('d', contourPath(contour.points.map((point) => {
						const dx = matrix.a * point.x + matrix.c * point.y + matrix.e - currentPointer.x;
						const dy = matrix.b * point.x + matrix.d * point.y + matrix.f - currentPointer.y;
						const distance = Math.hypot(dx, dy);
						if (distance === 0 || distance >= 160) return point;
						const force = 12 * energy * Math.pow(Math.sin(Math.PI * distance / 160), 2);
						const sx = dx / distance * force;
						const sy = dy / distance * force;
						return { x: point.x + inverse.a * sx + inverse.c * sy, y: point.y + inverse.b * sx + inverse.d * sy };
					}), contour.closed));
				});
			} else if (energy > 0) {
				energy = 0;
				restorePaths();
			}
			if (moving || energy > 0) schedule();
			else lastTime = 0;
		}
		function onPointer(event: PointerEvent) {
			if (!active() || event.pointerType !== 'mouse') return;
			if (event.clientY < headerBottom || event.clientY > bounds.bottom) {
				onLeave();
				return;
			}
			pointer = { x: event.clientX, y: event.clientY };
			energy = 1;
			target = { x: (1 - event.clientX / width * 2) * 8, y: (1 - (event.clientY - headerBottom) / Math.max(1, bounds.bottom - headerBottom) * 2) * 8 };
			schedule();
		}
		function onLeave() {
			target = { x: 0, y: 0 };
			if (active()) schedule();
		}
		function onLayout() {
			needsMeasure = true;
			target = { x: 0, y: 0 };
			schedule();
		}
		function onVisibility() {
			if (document.hidden) {
				cancelAnimationFrame(frame);
				frame = 0;
				lastTime = 0;
				reset();
			} else onLayout();
		}
		const resizeObserver = new ResizeObserver(onLayout);
		resizeObserver.observe(hero);
		if (header) resizeObserver.observe(header);
		const experienceObserver = new IntersectionObserver(([entry]) => {
			experienceVisible = entry.isIntersecting;
			onLayout();
		});
		if (experience) experienceObserver.observe(experience);
		window.addEventListener('pointermove', onPointer, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave, { passive: true });
		window.addEventListener('blur', onLeave);
		window.addEventListener('scroll', onLayout, { passive: true });
		window.addEventListener('resize', onLayout, { passive: true });
		document.addEventListener('visibilitychange', onVisibility);
		motion.addEventListener('change', onLayout);
		measure();
		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			experienceObserver.disconnect();
			window.removeEventListener('pointermove', onPointer);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			window.removeEventListener('blur', onLeave);
			window.removeEventListener('scroll', onLayout);
			window.removeEventListener('resize', onLayout);
			document.removeEventListener('visibilitychange', onVisibility);
			motion.removeEventListener('change', onLayout);
			reset();
			layer.style.removeProperty('opacity');
		};
	}, [heroRef, imageRef]);

	return (
		<div ref={layerRef} className={classes.layer} aria-hidden="true" data-hero-contours="">
			<svg ref={svgRef} className={classes.svg} viewBox={terrain.viewBox} preserveAspectRatio="xMidYMid slice" focusable="false">
				{terrain.contours.map((contour, index) => (
					<path key={index} d={contour.path} strokeOpacity={contour.major ? .18 : .12} strokeWidth={contour.major ? 1.2 : .8} vectorEffect="non-scaling-stroke" />
				))}
			</svg>
		</div>
	);
}
