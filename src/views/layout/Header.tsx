import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';

const useStyle = makeStyles()((theme) => ({
	header: {
		height: '0',
		width: '100%',
		backgroundColor: 'transparent',
	},
	a: {
		position: 'fixed',
		top: '1.5rem',
		left: '2rem',
		zIndex: theme.zIndex.speedDial,
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
	const { classes } = useStyle();
	return (
		<header className={classes.header}>
			<a className={classes.a} href="/">
				Joseph Tseng
			</a>
		</header>
	);
}
