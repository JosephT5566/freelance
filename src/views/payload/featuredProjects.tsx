import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { featuredProjects } from '../../content/projects';

const useStyles = makeStyles()((theme) => ({
	section: { padding: '4rem 16.6%', [theme.breakpoints.down('md')]: { padding: '3rem 2rem' } },
	intro: { maxWidth: '45rem', margin: '1rem 0 2rem' },
	project: {
		padding: '1.75rem 0',
		borderTop: `1px solid ${theme.palette.primary.light}`,
		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
		gap: '1.5rem',
		[theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: '0.75rem' },
	},
	link: {
		display: 'inline-block',
		marginTop: '1rem',
		textDecoration: 'underline',
		textUnderlineOffset: '0.2em',
		'&:focus-visible': { outline: `2px solid ${theme.palette.secondary.main}`, outlineOffset: '4px' },
	},
}));

export default function FeaturedProjects() {
	const { classes } = useStyles();
	return (
		<section className={classes.section} aria-labelledby="featured-projects-title">
			<Typography variant="h1" component="h2" id="featured-projects-title">
				Featured Personal Projects
			</Typography>
			<Typography variant="body1" className={classes.intro}>
				Outside my professional frontend work, I build applications to explore backend ownership, cloud
				delivery, and AI-assisted workflows.
			</Typography>
			{featuredProjects.map((project) => (
				<article className={classes.project} key={project.id}>
					<Typography variant="h2" component="h3">
						{project.title}
					</Typography>
					<div>
						<Typography variant="body1">{project.summary}</Typography>
						<Link className={classes.link} href={project.href}>
							{project.linkLabel}
						</Link>
					</div>
				</article>
			))}
			<Link className={classes.link} href="/projects/">
				View all personal projects
			</Link>
		</section>
	);
}
