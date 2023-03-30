import React, { useEffect, useRef, useCallback, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSpring, animated } from '@react-spring/web';
import _ from 'lodash';
import useWidth from '../../hooks/useWidth';

const useStyle = makeStyles()((theme) => ({
	outerWrapper_trans: {
		position: 'fixed',
		left: '0',
		top: '0',
		width: '100%',
		height: '100%',
		backgroundColor: 'inherit',
		overflow: 'hidden',
		[theme.breakpoints.down('sm')]: {
			overflow: 'auto',
			position: 'initial',
		},
	},
	wrapper_trans: {
		position: 'absolute',
		top: '0',
		left: '0',
		display: 'flex',
		minWidth: '100%',
		overflow: 'hidden',
		willChange: 'transform',
		[theme.breakpoints.down('sm')]: {
			position: 'initial',
			flexDirection: 'column',
			paddingTop: '5em',
		},
	},
	outerWrapper_rotate: {
		// the size of width and height is the point
		position: 'absolute',
		width: '100vh',
		height: '100vw',
		backgroundColor: 'inherit',
		transform: 'rotate(-90deg) translateX(-100vh)',
		transformOrigin: 'top left',
		overflowY: 'scroll',
		overflowX: 'hidden',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
		[theme.breakpoints.down('sm')]: {
			position: 'initial',
			width: '100%',
			height: '100%',
			overflow: 'auto',
			transform: 'initial',
		},
	},
	wrapper_rotate: {
		display: 'flex',
		flexDirection: 'row',
		transform: 'rotate(90deg) translateY(-100vh)',
		transformOrigin: 'top left',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			paddingTop: '5em',
			transform: 'initial',
		},
	},
}));

// Use two layers of wrapper, outer wrapper set to 'fixed', and inner wrapper set to 'absolute'.
// Use CSS method, `transform: translateX(x px)` to simulate scrolling animation
// *** NOTICE: The SIZE of children should be set, like (width: '100vw', height: '100vh') ***
export function HorizontalScroll_trans(props: { children: ReactNode }) {
	const { children } = props;
	const { classes } = useStyle();
	const theme = useTheme();

	// get the width of wrappers
	const outerWrapperRef = useRef(null);
	const wrapperRef = useRef(null);
	const outerWrapperWidth = useWidth(outerWrapperRef);
	const wrapperWidth = useWidth(wrapperRef);

	const transXRef = useRef(0);
	const maxTransXRef = useRef(0);
	const touchXDownRef = useRef(0);
	const prevTouchXDiffRef = useRef(0);

	const isViewPortLarge = useMediaQuery(theme.breakpoints.up('md'));

	const [styles, api] = useSpring(() => ({
		x: 0,
	}));

	const apiStart = (newTransX: number) => {
		transXRef.current = newTransX;
		api.start(() => {
			return { x: transXRef.current };
		});
	};

	useEffect(() => {
		maxTransXRef.current = wrapperWidth - window.innerWidth;
	}, [wrapperWidth]);

	const registerEvents = () => {
		window.addEventListener('wheel', handleWheel);
		window.addEventListener('keydown', handleKeyboard);
		window.addEventListener('touchstart', handleTouchstart);
		window.addEventListener('touchmove', handleTouchmove);
		window.addEventListener('touchend', handleTouchEnd);
	};

	const removeEvents = () => {
		window.removeEventListener('wheel', handleWheel);
		window.removeEventListener('keydown', handleKeyboard);
		window.removeEventListener('touchstart', handleTouchstart);
		window.removeEventListener('touchmove', handleTouchmove);
		window.removeEventListener('touchend', handleTouchEnd);
	};

	const handleTouchstart = useCallback((event: TouchEvent) => {
		touchXDownRef.current = event.touches[0].clientX;
	}, []);

	const handleTouchEnd = useCallback(() => {
		prevTouchXDiffRef.current = 0;
	}, []);

	const handleTouchmove = useCallback((event: TouchEvent) => {
		const xDiff = event.touches[0].clientX - touchXDownRef.current;
		apiStart(_.clamp(transXRef.current + (xDiff - prevTouchXDiffRef.current), -maxTransXRef.current, 0));
		prevTouchXDiffRef.current = xDiff;
	}, []);

	const handleWheel = useCallback((event) => {
		event.deltaX && apiStart(_.clamp(transXRef.current - event.deltaX, -maxTransXRef.current, 0));
		event.deltaY && apiStart(_.clamp(transXRef.current - event.deltaY, -maxTransXRef.current, 0));
	}, []);

	const handleKeyboard = useCallback(
		(event) => {
			(event.key === 'ArrowLeft' || event.key === 'ArrowUp') &&
				apiStart(_.clamp(transXRef.current + outerWrapperWidth / 2, -maxTransXRef.current, 0));

			(event.key === 'ArrowRight' || event.key === 'ArrowDown') &&
				apiStart(_.clamp(transXRef.current - outerWrapperWidth / 2, -maxTransXRef.current, 0));
		},
		[outerWrapperWidth]
	);

	useEffect(() => {
		// Disable web page navigation on swipe(back and forward)
		document.body.style.overscrollBehaviorX = 'none';
	}, []);

	useEffect(() => {
		isViewPortLarge && registerEvents();

		return () => removeEvents();
	}, [isViewPortLarge]);

	useEffect(() => {
		!isViewPortLarge && apiStart(0);
	}, [isViewPortLarge]);

	return (
		<div className={classes.outerWrapper_trans} ref={outerWrapperRef}>
			<animated.div className={classes.wrapper_trans} ref={wrapperRef} style={{ ...styles }}>
				{children}
			</animated.div>
		</div>
	);
}

// Use CSS method, `transform: rotate(-90deg)` to change the direction
// There are two layers of wrapper, set the outer wrapper to 'absolute'.
// But there are no any gesture control, can only scroll up/down to move horizontally
// *** NOTICE: The SIZE of children should be set, like (width: '100vw', height: '100vh') ***
export function HorizontalScroll_rotate(props: { children: ReactNode }) {
	const { children } = props;
	const { classes } = useStyle();

	return (
		<div className={classes.outerWrapper_rotate}>
			<div className={classes.wrapper_rotate}>{children}</div>
		</div>
	);
}
