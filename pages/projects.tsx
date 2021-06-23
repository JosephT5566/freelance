import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HorizontalScroll_trans } from '../src/components/shared/horizontalScroll';

import Head from 'next/head';
import Project from '../src/views/payload/project';

const useStyle = makeStyles((theme) => ({
	projectPage: {},
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
					description={'2021 Megaport Festival performance selector.'}
					url={'https://josepht5566.github.io/musicFest'}
					tools={['RWD web', 'React js', 'Gh-pages']}
				/>
				<Project
					title={'Megaport selector'}
					image={'https://live.staticflickr.com/65535/51049860506_291e6c2cf3_b.jpg'}
					description={
						'Nunc accumsan ipsum vitae ex lacinia varius. Donec condimentum sodales odio eu accumsan. Sed quis velit condimentum, vehicula ex sit amet, rutrum mi'
					}
					url={''}
					tools={['1', '2']}
				/>
				<Project title={'Next'} />
			</HorizontalScroll_trans>
		</div>
	);
}
