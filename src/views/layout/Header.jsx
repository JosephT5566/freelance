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
		paddingLeft: '2em',
		height: theme.typography.headerHeight,
		textDecoration: 'none',
		'& img': {
			height: '90%',
			padding: '0 1em',
		},
	},
	label: {
		fontFamily: 'Vidaloka',
		fontWeight: 'normal',
		color: theme.palette.text.primary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
}));

export default function Header() {
	const classes = useStyle();
	return (
		<div className={classes.header}>
			<a className={classes.a} href="/">
				{/* <img src={'/mega_origin.png'} alt="mega_origin" /> */}
				<h2 className={classes.label}>Joseph Tseng</h2>
			</a>
		</div>
	);
}
