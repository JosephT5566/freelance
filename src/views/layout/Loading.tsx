import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyle = makeStyles(() => ({
	loading: {
		display: 'flex',
		justifyContent: 'center',
		padding: '2em 0',
	},
}));

export default function Loading() {
	const classes = useStyle();

	return (
		<Container className={classes.loading}>
			<CircularProgress color={'secondary'} />
		</Container>
	);
}
