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
				<Typography variant="body1">{'Hi, this is Joseph'}</Typography>
				<Typography variant="body1">
					{`
						A front-end developer. I enjoy interesting and meaningful projects, the development process is really fascinating.
						I like to focus not just on code but also on quality. Try to design perfection and optimized UX/UI is always the primary purpose,
						and I keep improving myself to achieve that.
						I always take my work seriously as I treat myself.
					`}
				</Typography>
			</article>
			<div className={classes.profileImage} style={{ backgroundImage: `url(/images/profile.jpg)` }}></div>
		</section>
	);
}
