import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';

const useStyle = makeStyles()((theme) => ({
	aboutme: {
		width: '100%',
		overflow: 'hidden',
		[theme.breakpoints.up('md')]: {
			height: '600px',
			display: 'grid',
			gridTemplateColumns: '50% 50%',
			gridTemplateRows: 'repeat(6, 1fr)',
			gridGap: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
		},
	},
	profileImage: {
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		[theme.breakpoints.up('md')]: {
			height: '100%',
			gridColumn: '2 / auto',
			gridRow: '1 / span 6',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			paddingTop: '133.33%',
		},
	},
	title: {
		marginBottom: '2rem',
		[theme.breakpoints.up('md')]: {
			gridColumn: '1',
			gridRow: '2 / auto',
			padding: '0 2rem',
		},
		[theme.breakpoints.down('sm')]: {
			paddingTop: '1em',
		},
	},
	description: {
		marginBottom: '5rem',
		padding: '0 2em',
		[theme.breakpoints.up('md')]: {
			gridColumn: '1',
			gridRow: '3 / auto',
		},
		'& > p': {
			marginBottom: '1em',
		},
	},
}));

export default function AboutMe() {
	const { classes } = useStyle();
	return (
		<section className={classes.aboutme}>
			<Typography variant="h1" className={classes.title}>
				{'About Me'}
			</Typography>
			<article className={classes.description}>
				<Typography variant="body1">
					{'Product-minded software engineer building reliable web experiences.'}
				</Typography>
				<Typography variant="body1">
					{`
						I specialize in frontend and full-stack product development with React, TypeScript,
						Next.js, SvelteKit, GraphQL, and modern web architecture. At Houzz, I have delivered
						marketplace search and browse improvements, CMS-driven campaign platforms,
						experimentation workflows, and 3D and AI-assisted product integrations.
					`}
				</Typography>
				<Typography variant="body1">
					{`
						I work across product, design, backend, platform, personalization, and data teams to
						turn ambiguous requirements into maintainable releases. My approach combines product
						thinking with production debugging, QA planning, feature flags, analytics, and
						release monitoring.
					`}
				</Typography>
			</article>
			<div className={classes.profileImage} style={{ backgroundImage: `url(/images/profile.jpg)` }}></div>
		</section>
	);
}
