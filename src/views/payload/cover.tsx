import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sphere from './sphere';

const useStyle = makeStyles((theme) => ({
	cover: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100vh',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	text: {
		fontFamily: 'Lobster',
		position: 'absolute',
		bottom: '4rem',
		left: '3rem',
		color: theme.palette.text.secondary,
		// mixBlendMode: 'difference',
		'& h1': {
			[theme.breakpoints.up('md')]: {
				fontSize: '5vw',
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '10vw',
			},
			fontWeight: 'normal',
			margin: '0',
		},
	},
}));

export default function Cover() {
	const classes = useStyle();
	return (
		<div className={classes.cover} style={{ backgroundImage: `url(/cover.jpg)` }}>
			<div className={classes.text}>
				<h1>THIS IS</h1>
				<h1>JOSEPH TSENG</h1>
			</div>
			<Sphere />
		</div>
	);
}
