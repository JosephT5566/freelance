import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
	header: {
		position: 'sticky',
		top: '0',
		alignItems: 'center',
		height: '0',
		width: '100%',
		backgroundColor: 'transparent',
		zIndex: theme.zIndex.appBar + 1,
	},
	a: {
		position: 'absolute',
		top: '1.5rem',
		left: '2rem',
		textDecoration: 'none',
		fontFamily: theme.typography.h1.fontFamily,
		fontSize: '1.5rem',
		fontWeight: 'normal',
		color: theme.palette.text.primary,
		transition: '0.5s',
		'&:hover': {
			color: theme.palette.secondary.main,
		},
		'&:focus': {
			color: theme.palette.secondary.main,
			outline: 'none',
		},
	},
}));

export default function Header() {
	const classes = useStyle();
	return (
		<header className={classes.header}>
			<a className={classes.a} href="/">
				Joseph Tseng
			</a>
		</header>
	);
}
