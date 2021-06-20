import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import _ from 'lodash';

import Head from 'next/head';
import Project from '../src/views/payload/project';

const useStyle = makeStyles((theme) => ({
	projectPage: {
		position: 'fixed',
		left: '0',
		top: '0',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		[theme.breakpoints.down('sm')]: {
			overflow: 'auto',
			position: 'initial',
		},
	},
	projects: {
		position: 'absolute',
		top: '0',
		left: '0',
		display: 'flex',
		minWidth: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		willChange: 'transform',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			paddingTop: '5em',
		},
	},
}));

export default function Projects() {
	const classes = useStyle();
	const [transX, setTransX] = useState(0);
	const projsContRef = useRef(null);
	const theme = useTheme();
	const isViewPortLarge = useMediaQuery(theme.breakpoints.up('md'));

	const handleWheel = (event) => {
		const maxTransX = projsContRef.current.clientWidth - window.innerWidth;

		event.deltaX && setTransX((prev) => _.clamp(prev - event.deltaX, -maxTransX, 0));
		event.deltaY && setTransX((prev) => _.clamp(prev - event.deltaY, -maxTransX, 0));
	};

	useEffect(() => {
		// Disable web page navigation on swipe(back and forward)
		document.body.style.overscrollBehaviorX = 'none';
	}, []);

	useEffect(() => {
		isViewPortLarge
			? window.addEventListener('wheel', handleWheel)
			: window.removeEventListener('wheel', handleWheel);

		return () => window.removeEventListener('wheel', handleWheel);
	}, [handleWheel, isViewPortLarge]);

	useEffect(() => {
		!isViewPortLarge && setTransX(0);
	}, [isViewPortLarge]);

	return (
		<div className={classes.projectPage}>
			<Head>
				<title>Projects</title>
			</Head>
			<div className={classes.projects} ref={projsContRef} style={{ transform: `translateX(${transX}px)` }}>
				<Project
					title={'Megaport selector'}
					image={'https://i.imgur.com/OgYq1S8.png'}
					description={'2021大港開唱，看團選擇器'}
					url={'https://josepht5566.github.io/musicFest'}
					tools={['React js', 'RWD web', 'Gh-pages']}
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
			</div>
		</div>
	);
}
