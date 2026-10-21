'use client';

import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import type { CaseStudy } from '../content/projects';

const useStyles = makeStyles()((theme) => ({
	main: {
		width: '100%',
		maxWidth: '54rem',
		margin: '0 auto',
		padding: '3.5rem 3rem 4rem',
		[theme.breakpoints.down('md')]: { padding: '2.5rem 1.25rem 3rem' },
	},
	header: { margin: '2rem 0 3rem', '& h1': { overflowWrap: 'anywhere' } },
	intro: { maxWidth: '50rem', marginTop: '1rem' },
	tools: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '0.5rem 1.25rem',
		padding: 0,
		marginTop: '1.5rem',
		listStyle: 'none',
	},
	section: {
		padding: '2rem 0',
		borderTop: `1px solid ${theme.palette.primary.light}`,
		'& h2': { marginBottom: '1rem' },
		'& p': { maxWidth: '50rem', marginBottom: '1rem' },
	},
	links: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '1.5rem',
		'& a': { minHeight: 44, padding: '0.5rem 0', textDecoration: 'underline', textUnderlineOffset: '0.2em' },
	},
}));

export default function ProjectCaseStudy({ project }: { project: CaseStudy }) {
	const { classes } = useStyles();
	return (
		<>
			<main className={classes.main}>
				<Link className="text-link" href="/projects/">
					All personal projects
				</Link>
				<header className={classes.header}>
					<Typography variant="body1">Personal project case study</Typography>
					<Typography variant="h1" component="h1">
						{project.title}
					</Typography>
					<Typography variant="body1" className={classes.intro}>
						{project.summary}
					</Typography>
					<ul className={classes.tools} aria-label="Technology">
						{project.tools.map((tool) => (
							<li key={tool}>{tool}</li>
						))}
					</ul>
					<div className={classes.links}>
						<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
							Source on GitHub
						</a>
						<Link href={`/projects/#${project.id}`}>View in project catalog</Link>
					</div>
				</header>
				{project.sections.map((section) => (
					<section className={classes.section} key={section.title}>
						<Typography variant="h2" component="h2">
							{section.title}
						</Typography>
						{section.paragraphs.map((paragraph) => (
							<Typography variant="body1" key={paragraph}>
								{paragraph}
							</Typography>
						))}
					</section>
				))}
				<div className={classes.links}>
					<Link href="/projects/">View all personal projects</Link>
					<Link href="/experience/">Professional experience</Link>
				</div>
			</main>
		</>
	);
}
