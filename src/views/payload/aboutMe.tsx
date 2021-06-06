import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
	aboutme: {
		width: '100vw',
		height: '600px',
		display: 'grid',
		gridTemplateColumns: '50% 50%',
		gridTemplateRows: 'repeat(6, 1fr)',
		gridGap: '20px',
		[theme.breakpoints.down('sm')]: {},
	},
	profileImage: {
		height: '100%',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		gridColumn: '2 / auto',
		gridRow: '1 / span 6',
	},
	title: {
		gridColumn: '1',
		gridRow: '2 / auto',
	},
	description: {
		gridColumn: '1',
		gridRow: '3 / auto',
	},
}));

export default function AboutMe() {
	const classes = useStyle();
	return (
		<Container className={classes.aboutme}>
			<div className={classes.profileImage} style={{ backgroundImage: `url(/images/profile.jpg)` }}></div>
			<Typography variant="h1" className={classes.title}>
				{'About Me'}
			</Typography>
			<div className={classes.description}>
				<Typography variant="body1">{'Hi, this is Joseph'}</Typography>
				<Typography variant="body1">{'Hi, this is Joseph'}</Typography>
			</div>
		</Container>
	);
}
