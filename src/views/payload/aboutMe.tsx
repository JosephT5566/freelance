import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
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
			aspectRatio: '3 / 4',
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
	const classes = useStyle();
	return (
		<div className={classes.aboutme}>
			<Typography variant="h1" className={classes.title}>
				{'About Me'}
			</Typography>
			<div className={classes.description}>
				<Typography variant="body1">{'Hi, this is Joseph'}</Typography>
				<Typography variant="body1">
					{
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis metus eu mi pharetra, ut molestie mauris commodo. Quisque posuere, leo eu euismod aliquet, quam est dapibus lacus, ut fringilla elit risus a leo. Pellentesque imperdiet magna quis tellus aliquam rhoncus. Suspendisse laoreet, lectus sed semper sagittis, purus neque congue nulla, a porttitor risus diam ut mi'
					}
				</Typography>
			</div>
			<div className={classes.profileImage} style={{ backgroundImage: `url(/images/profile.jpg)` }}></div>
		</div>
	);
}
