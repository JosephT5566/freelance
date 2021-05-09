import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
	cover: {
		display: 'flex',
		width: '100vw',
		height: '100vh',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	name: {
		position: 'absolute',
		bottom: '1em',
		color: 'white',
		// mixBlendMode: 'difference',
	},
}));

export default function Cover() {
	const classes = useStyle();
	return (
		<div className={classes.cover} style={{ backgroundImage: `url(/cover.jpg)` }}>
			<h1 className={classes.name}>JOSEPH TSENG</h1>
		</div>
	);
}
