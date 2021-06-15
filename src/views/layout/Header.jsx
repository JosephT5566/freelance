import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
	header: {
		position: 'sticky',
		top: '0',
		alignItems: 'center',
		height: '0',
		width: '100vw',
		backgroundColor: 'transparent',
		zIndex: theme.zIndex.appBar + 1,
	},
	a: {
		position: 'absolute',
		top: '1.5em',
		left: '2em',
		height: theme.typography.headerHeight,
		textDecoration: 'none',
	},
	label: {
		fontFamily: theme.typography.h1.fontFamily,
		fontWeight: 'normal',
		color: theme.palette.text.primary,
		transition: '0.5s',
		'&:hover': {
			color: theme.palette.primary.main,
			color: theme.palette.secondary.main,
		},
	},
}));

export default function Header() {
	const classes = useStyle();
	return (
		<div className={classes.header}>
			<a className={classes.a} href="/">
				{/* <img src={'/mega_origin.png'} alt="mega_origin" /> */}
				<Typography className={classes.label} variant="h2">
					Joseph Tseng
				</Typography>
			</a>
		</div>
	);
}
