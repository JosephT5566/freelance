'use client';

import { ReactNode, useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import Header from '../views/layout/Header';
import Navigation from '../views/layout/Navigation';
import packageJson from '../../package.json';

const useStyle = makeStyles()((theme) => ({
	page: {
		width: '100%',
		backgroundColor: theme.palette.background.default,
	},
}));

export default function AppShell({ children }: { children: ReactNode }) {
	const { classes } = useStyle();

	useEffect(() => {
		console.log(`${packageJson.name} v${packageJson.version}`);
	}, []);

	return (
		<div className={classes.page}>
			<Header />
			<Navigation />
			{children}
		</div>
	);
}
