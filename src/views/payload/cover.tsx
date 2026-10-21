import type { RefObject } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
	cover: { paddingTop: 56, [theme.breakpoints.down('sm')]: { paddingTop: 40 } },
	name: {
		fontFamily: theme.typography.fontFamily,
		fontSize: 'clamp(3rem, 8.7vw, 8rem)',
		fontWeight: 500,
		letterSpacing: '-.065em',
		lineHeight: 1.05,
		margin: '12px 0 24px',
		textTransform: 'uppercase',
	},
	intro: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		gap: 32,
		marginBottom: 40,
		[theme.breakpoints.down('sm')]: { marginBottom: 28 },
	},
	copy: { maxWidth: 650, fontSize: 'clamp(1rem, 1.45vw, 1.125rem)', lineHeight: 1.75, margin: 0 },
	mark: {
		width: 48,
		height: 2,
		flexShrink: 0,
		marginBottom: 12,
		background: theme.palette.secondary.main,
		[theme.breakpoints.down('sm')]: { display: 'none' },
	},
	imageFrame: {
		position: 'relative',
		overflow: 'hidden',
		height: 'clamp(180px, 21vw, 280px)',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: 'center 30%',
		display: 'block',
		'@media (min-width: 721px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)': {
			position: 'absolute',
			top: -12,
			left: -12,
			width: 'calc(100% + 24px)',
			maxWidth: 'none',
			height: 'calc(100% + 24px)',
		},
	},
}));

export default function Cover({ heroRef, imageRef }: {
	heroRef: RefObject<HTMLElement | null>;
	imageRef: RefObject<HTMLImageElement | null>;
}) {
	const { classes } = useStyles();
	return (
		<section ref={heroRef} className={`site-container ${classes.cover}`} aria-labelledby="intro-title">
			<p className="section-kicker">Software engineer · Frontend & product</p>
			<h1 id="intro-title" className={classes.name}>
				Joseph Tseng
			</h1>
			<div className={classes.intro}>
				<p className={classes.copy}>
					I build web products with a focus on thoughtful interfaces, reliable delivery, and the details that
					make them work.
				</p>
				<span className={classes.mark} aria-hidden="true" />
			</div>
			<div className={classes.imageFrame}>
				<img
					ref={imageRef}
					className={classes.image}
					src="https://cdn.josephtseng-tw.com/profile-website/hero-2026.jpg"
					alt="Rock pinnacles above misty green hills and lochs"
					width={1920}
					height={1280}
					fetchPriority="high"
				/>
			</div>
		</section>
	);
}
