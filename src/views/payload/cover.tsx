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
	image: {
		width: '100%',
		height: 'clamp(180px, 21vw, 280px)',
		objectFit: 'cover',
		objectPosition: 'center 30%',
		display: 'block',
	},
}));

export default function Cover() {
	const { classes } = useStyles();
	return (
		<section className={`site-container ${classes.cover}`} aria-labelledby="intro-title">
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
			<img
				className={classes.image}
				src="https://cdn.josephtseng-tw.com/profile-website/hero-2026.jpg"
				alt="Rock pinnacles above misty green hills and lochs"
				width={1920}
				height={1280}
				fetchPriority="high"
			/>
		</section>
	);
}
