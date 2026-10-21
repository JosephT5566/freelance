import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { featuredProjects } from '../../content/projects';
import ProjectVisual from './projectVisual';

const useStyles = makeStyles()((theme) => ({
	section: { paddingBlock: 80, [theme.breakpoints.down('sm')]: { paddingBlock: 56 } },
	heading: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		alignItems: 'end',
		gap: 48,
		marginBottom: 40,
		[theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: 20, marginBottom: 28 },
	},
	intro: { margin: 0, maxWidth: 520, fontSize: 15, lineHeight: 1.8 },
	projects: {
		display: 'grid',
		gridTemplateColumns: '1.15fr 1fr',
		gap: 40,
		[theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: 40 },
	},
	project: {
		minWidth: 0,
		'& h3': { margin: '22px 0 12px', fontSize: 'clamp(2rem, 3vw, 2.75rem)' },
		'& > p': { margin: '0 0 12px' },
	},
	visual: { height: 250, [theme.breakpoints.down('sm')]: { height: 220 } },
	travel: {
		display: 'grid',
		gridTemplateColumns: '1fr 1.5fr auto',
		alignItems: 'center',
		gap: 28,
		borderTop: '1px solid rgba(37,66,81,.25)',
		marginTop: 40,
		paddingTop: 24,
		'& p': { margin: 0, fontSize: 14 },
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '1fr auto',
			gap: '12px 20px',
			'& p': { gridColumn: '1 / -1', gridRow: 2 },
		},
	},
	all: { marginTop: 24 },
}));

export default function FeaturedProjects() {
	const { classes } = useStyles();
	return (
		<section
			className={`site-container ${classes.section}`}
			id="work"
			aria-labelledby="featured-projects-title"
		>
			<div className={classes.heading}>
				<div>
					<p className="section-kicker">Selected work / Personal projects</p>
					<Typography variant="h2" component="h2" id="featured-projects-title">
						Built out of curiosity.
					</Typography>
				</div>
				<p className={classes.intro}>
					Outside my professional frontend work, I build applications to explore backend ownership, cloud
					delivery, and AI-assisted workflows.
				</p>
			</div>
			<div className={classes.projects}>
				{featuredProjects
					.filter((project) => project.visual)
					.map((project) => (
						<article className={classes.project} key={project.id}>
							{project.visual && (
								<div className={classes.visual}>
									<ProjectVisual visual={project.visual} />
								</div>
							)}
							<Typography variant="h3" component="h3">
								{project.title}
							</Typography>
							<Typography variant="body1">{project.summary}</Typography>
							<Link className="text-link" href={project.href} aria-label={project.linkLabel}>
								Read case study <ArrowUpRight size={17} aria-hidden="true" />
							</Link>
						</article>
					))}
			</div>
			{featuredProjects
				.filter((project) => !project.visual)
				.map((project) => (
					<article className={classes.travel} key={project.id}>
						<Typography variant="h3" component="h3">
							{project.title}
						</Typography>
						<p>{project.summary}</p>
						<Link className="icon-link" href={project.href} aria-label={project.linkLabel}>
							<ArrowUpRight size={22} aria-hidden="true" />
						</Link>
					</article>
				))}
			<Link className={`text-link ${classes.all}`} href="/projects/">
				All personal projects <ArrowUpRight size={17} aria-hidden="true" />
			</Link>
		</section>
	);
}
