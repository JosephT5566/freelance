import React, { useEffect, useRef, useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSpring, animated } from '@react-spring/web';
import _ from 'lodash';
import useWidth from '../src/hooks/useWidth';

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
			position: 'initial',
			flexDirection: 'column',
			paddingTop: '5em',
		},
	},
}));

export default function Projects() {
	const classes = useStyle();
	const outerWrapperRef = useRef(null);
	const wrapperRef = useRef(null);
	const transXRef = useRef(0);
	const theme = useTheme();

	const isViewPortLarge = useMediaQuery(theme.breakpoints.up('md'));
	const outerWrapperWidth = useWidth(outerWrapperRef);
	const wrapperWidth = useWidth(wrapperRef);

	const [styles, api] = useSpring(() => ({
		x: 0,
	}));

	const apiStart = (newTransX: number) => {
		transXRef.current = newTransX;
		api.start(() => {
			return { x: transXRef.current };
		});
	};

	const registerEvents = () => {
		window.addEventListener('wheel', handleWheel);
		window.addEventListener('keydown', handleKeyboard);
	};

	const handleWheel = useCallback(
		(event) => {
			const maxTransX = wrapperWidth - window.innerWidth;

			event.deltaX && apiStart(_.clamp(transXRef.current - event.deltaX, -maxTransX, 0));
			event.deltaY && apiStart(_.clamp(transXRef.current - event.deltaY, -maxTransX, 0));
		},
		[wrapperWidth]
	);

	const handleKeyboard = useCallback(
		(event) => {
			const maxTransX = wrapperWidth - window.innerWidth;

			(event.key === 'ArrowLeft' || event.key === 'ArrowUp') &&
				apiStart(_.clamp(transXRef.current + outerWrapperWidth / 2, -maxTransX, 0));

			(event.key === 'ArrowRight' || event.key === 'ArrowDown') &&
				apiStart(_.clamp(transXRef.current - outerWrapperWidth / 2, -maxTransX, 0));
		},
		[wrapperWidth]
	);

	useEffect(() => {
		// Disable web page navigation on swipe(back and forward)
		document.body.style.overscrollBehaviorX = 'none';
	}, []);

	useEffect(() => {
		isViewPortLarge && registerEvents();

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('keydown', handleKeyboard);
		};
	}, [handleWheel, handleKeyboard, isViewPortLarge]);

	useEffect(() => {
		!isViewPortLarge && apiStart(0);
	}, [isViewPortLarge]);

	return (
		<div className={classes.projectPage} ref={outerWrapperRef}>
			<Head>
				<title>Projects</title>
			</Head>
			<animated.div className={classes.projects} ref={wrapperRef} style={{ ...styles }}>
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
			</animated.div>
		</div>
	);
}
