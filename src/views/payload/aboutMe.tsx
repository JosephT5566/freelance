import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';

const useStyle = makeStyles()((theme) => ({
	aboutme: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
		gap: '2rem',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 0 },
	},
	profileImage: {
		width: '100%',
		height: 'auto',
		maxHeight: '28rem',
		aspectRatio: '4 / 3',
		objectFit: 'cover',
		[theme.breakpoints.down('md')]: { maxHeight: '22rem' },
	},
	copy: { padding: '3rem 2rem' },
	title: { marginBottom: '1.5rem' },
	description: { '& > p': { marginBottom: '1rem' } },
}));

export default function AboutMe() {
	const { classes } = useStyle();
	return (
		<section className={classes.aboutme} aria-labelledby="about-title">
			<div className={classes.copy}>
				<Typography variant="h1" component="h2" className={classes.title} id="about-title">
					About Me
				</Typography>
				<div className={classes.description}>
					<Typography variant="body1">
						I am a software engineer focused on frontend and product development. At Houzz, I worked on
						marketplace discovery, CMS campaigns, experimentation, and 3D and AI-assisted product integrations
						with cross-functional teams.
					</Typography>
					<Typography variant="body1">
						In personal projects, I extend that experience into backend APIs, PostgreSQL, cloud delivery, and
						AI-assisted workflows. I care about clear product behavior, maintainable code, and understanding
						what happens when a request fails.
					</Typography>
				</div>
			</div>
			<img
				className={classes.profileImage}
				src="/images/profile.jpg"
				alt="Joseph Tseng"
				width="1067"
				height="1600"
				loading="lazy"
			/>
		</section>
	);
}
