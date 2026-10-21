'use client';

import { projectItems } from '../content/projects';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import Project from '../views/payload/project';

const useStyles = makeStyles()((theme) => ({
	page: { paddingBlock: '56px 64px', [theme.breakpoints.down('sm')]: { paddingBlock: '40px 48px' } },
	header: { marginBottom: 32, '& p': { maxWidth: 680, marginTop: 20 } },
	index: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '8px 28px',
		padding: '12px 0 32px',
		margin: 0,
		listStyle: 'none',
	},
}));

export default function Projects() {
	const { classes } = useStyles();
	return (
		<main className={`site-container ${classes.page}`}>
			<header className={classes.header} id="projects-intro">
				<p className="section-kicker">Personal projects</p>
				<Typography variant="h1" component="h1">
					Joseph&apos;s Projects
				</Typography>
				<Typography variant="body1">
					A collection of personal applications built by Joseph Tseng to solve everyday problems and explore
					better product experiences.
				</Typography>
			</header>
			<nav aria-label="Project sections">
				<ul className={classes.index}>
					{projectItems.map((project) => (
						<li key={project.id}>
							<a className="text-link" href={`#${project.id}`}>
								{project.navLabel}
							</a>
						</li>
					))}
				</ul>
			</nav>
			{projectItems.map(({ navLabel, ...project }) => (
				<Project key={project.id} {...project} />
			))}
		</main>
	);
}
