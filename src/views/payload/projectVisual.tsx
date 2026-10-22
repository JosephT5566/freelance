import { ArrowRight } from 'lucide-react';
import { makeStyles } from 'tss-react/mui';
import type { ProjectVisual as ProjectVisualData } from '../../content/projects';

const useStyles = makeStyles()((theme) => ({
	figure: {
		margin: 0,
		minHeight: 240,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: '32px 28px',
		background: '#e5e8e5',
		[theme.breakpoints.down('sm')]: { padding: '28px 16px', minHeight: 220 },
	},
	caption: {
		fontSize: 11,
		letterSpacing: '.14em',
		fontWeight: 600,
		textTransform: 'uppercase',
		marginBottom: 32,
	},
	flow: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		gap: 10,
		'& svg': { flexShrink: 0, width: 16 },
		[theme.breakpoints.down('sm')]: { gap: 6, '& svg': { width: 12 } },
	},
	node: {
		flex: 1,
		minWidth: 0,
		padding: '20px 8px',
		textAlign: 'center',
		borderTop: '1px solid #829da9',
		borderBottom: '1px solid #829da9',
		fontSize: 'clamp(.65rem, 1.2vw, .875rem)',
		fontWeight: 500,
	},
	note: { fontSize: 12, margin: '28px 0 0' },
	image: {
		background: '#e8d5c7',
		height: '100%',
		'& img': { display: 'block', width: '100%', height: '100%' },
	},
}));

export default function ProjectVisual({ visual }: { visual: ProjectVisualData }) {
	const { classes } = useStyles();
	if (visual.kind === 'image')
		return (
			<div className={classes.image}>
				<img
					src={visual.src}
					alt={visual.alt}
					width={1280}
					height={720}
					style={{ objectFit: visual.fit }}
					loading="lazy"
				/>
			</div>
		);
	return (
		<figure className={classes.figure}>
			<figcaption className={classes.caption}>{visual.caption}</figcaption>
			<div className={classes.flow}>
				{visual.labels.map((label, index) => (
					<div key={label} style={{ display: 'contents' }}>
						{index > 0 && <ArrowRight aria-hidden="true" />}
						<span className={classes.node}>{label}</span>
					</div>
				))}
			</div>
			<p className={classes.note}>Review decisions → API → owned records</p>
		</figure>
	);
}
