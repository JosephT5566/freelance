import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
	header: {
		position: 'sticky',
		top: '0',
		alignItems: 'center',
		height: '0',
		width: '100vw',
		backgroundColor: 'transparent',
	},
	a: {
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		top: '0',
		left: '1em',
		height: theme.typography.headerHeight,
		textDecoration: 'none',
		color: theme.palette.text.secondary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
		'& img': {
			height: '90%',
			padding: '0 1em',
		},
	},
	label: {
		color: 'white',
	},
}));

export default function Header() {
	const classes = useStyle();
	return (
		<div className={classes.header}>
			<a className={classes.a} href="/">
				{/* <img src={'/mega_origin.png'} alt="mega_origin" /> */}
				<h2 className={classes.label}>Joseph T</h2>
			</a>
		</div>
	);
}
