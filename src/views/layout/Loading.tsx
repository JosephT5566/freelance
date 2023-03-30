import React from 'react';

import { makeStyles } from 'tss-react/mui';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

const useStyle = makeStyles()(() => ({
	loading: {
		display: 'flex',
		justifyContent: 'center',
		padding: '2em 0',
	},
}));

export default function Loading() {
	const { classes } = useStyle();

	return (
		<Container className={classes.loading}>
			<CircularProgress color={'secondary'} />
		</Container>
	);
}
