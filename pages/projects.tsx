import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
	projects: {
		width: '100%',
		height: '100vh',
		backgroundColor: theme.palette.background.default,
	},
}));

export default function Projects() {
	const classes = useStyle();

	return <div className={classes.projects}>{'Projects'}</div>;
}
