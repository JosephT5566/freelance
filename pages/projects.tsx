import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { HorizontalScroll_trans } from '../src/components/shared/horizontalScroll';

import Head from 'next/head';
import Project from '../src/views/payload/project';
import { APP_NAME } from '../src/utils/static';

const useStyle = makeStyles()((theme) => ({
	projectPage: {
		backgroundColor: theme.palette.background.default,
	},
}));

export default function Projects() {
	const { classes } = useStyle();

	return (
		<div className={classes.projectPage}>
			<Head>
				<title>{`Projects - ${APP_NAME}`}</title>
			</Head>
			<HorizontalScroll_trans>
				<Project
					title={'Megaport selector'}
					image={'https://i.imgur.com/MKtF24C.png'}
					description={`
						A performance selector for Megaport Festival.
						There are lots of shows in the two days, so I design a website
						to make scheduling easier. And people may participate the party with only mobile device,
						so RWD is required.
					`}
					url={'https://musicfest.josephtseng-tw.com'}
					tools={['RWD web', 'React js', 'Gh-pages']}
				/>
				<Project title={'Next'} />
			</HorizontalScroll_trans>
		</div>
	);
}
