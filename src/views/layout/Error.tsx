import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyle = makeStyles(() => ({
	errorPage: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function ErrorPage(props: { err: Error }) {
	const { err } = props;
	const classes = useStyle();

	console.log(err);
	return (
		<Container className={classes.errorPage}>
			<Typography variant={'h1'}>{'Oops!! Something Wrong...'}</Typography>
			<Typography variant={'body1'}>{err.message}</Typography>
		</Container>
	);
}
