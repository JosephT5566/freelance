import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HorizontalScroll_trans } from '../src/components/shared/horizontalScroll';

import Head from 'next/head';
import Project from '../src/views/payload/project';

const useStyle = makeStyles((theme) => ({
	projectPage: {
		backgroundColor: theme.palette.background.default,
	},
}));

export default function Projects() {
	const classes = useStyle();

	return (
		<div className={classes.projectPage}>
			<Head>
				<title>Projects</title>
			</Head>
			<HorizontalScroll_trans>
				<Project
					title={'Megaport selector'}
					image={'https://i.imgur.com/OgYq1S8.png'}
					description={`
						A performance selector for 2021 Megaport Festival.
						There are lots of shows in the two days, so I design a website
						to make scheduling easier. And people may participate the party with only mobile device,
						so RWD is required.
					`}
					url={'https://josepht5566.github.io/musicFest'}
					tools={['RWD web', 'React js', 'Gh-pages']}
				/>
				<Project title={'Next'} />
			</HorizontalScroll_trans>
		</div>
	);
}
