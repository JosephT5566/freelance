// credit: https://codesandbox.io/s/infinite-carousel-example-ifebt

import React, { useState, useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

import useWidth from '../../hooks/useWidth';

const useStyle = makeStyles((theme) => ({
	carousel: {
		width: '100%',
		height: '100%',
		position: 'relative',
		overflow: 'hidden',
	},
	imagesContainer: {
		display: 'inline-flex',
		height: '100%',
	},
	imageCard: {
		flexShrink: 0,
		width: '360px',
		height: '100%',
		borderRadius: '0.5rem',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
	},
	iconButton: {
		color: theme.palette.primary.main,
		position: 'absolute',
		zIndex: 1,
		top: '50%',
		transform: 'translate(0, -50%)',
		backgroundColor: 'white',
		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
			color: 'white',
		},
		'&.right': {
			right: '5%',
		},
		'&.left': {
			left: '5%',
		},
	},
	navButtonsContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingBlock: '0.2em',
		position: 'absolute',
		bottom: '0',
		left: '50%',
		transform: 'translate(-50%, 0)',
	},
	navButton: {
		padding: '0.2em',
	},
	dotIcon: {
		color: 'white',
		// marginInline: '0.2em',
	},
}));

const NavButton = (props: { isSelected: boolean; onClick: () => void }) => {
	const { isSelected, onClick } = props;
	const classes = useStyle();

	return (
		<IconButton className={classes.navButton} onClick={onClick}>
			{isSelected ? (
				<FiberManualRecordIcon className={classes.dotIcon} fontSize="small" />
			) : (
				<FiberManualRecordOutlinedIcon className={classes.dotIcon} fontSize="small" />
			)}
		</IconButton>
	);
};

interface Props {
	images: Array<{ imageLink: string }>;
}

const AUTO_SCROLL_TIMER = 10000;

export default function Carousel({ images: oriImages }: Props) {
	const viewPagerRef = useRef<HTMLDivElement>(null);
	const imagesContainerRef = useRef<HTMLDivElement>(null);
	const viewPagerWidth = useWidth(viewPagerRef);

	// we'll ADD two images at first and last
	const [images, setImages] = useState(oriImages);
	// use state to rerender
	const [index, setIndex] = useState(0);
	// same as index, but use this to check index and prevent from rerender
	const currentIndexRef = useRef(0);
	const minEdge = useRef(0);
	const maxEdge = useRef(0);
	const isTransiting = useRef(false);
	const isOverflow = useRef(false);

	const [position, api] = useSpring(() => ({
		x: 0,
		config: { duration: 200 },
		onStart: () => {
			isTransiting.current = true;
		},
		onRest: () => {
			isTransiting.current = false;
			if (currentIndexRef.current > maxEdge.current) {
				// console.log('max overflow');
				isOverflow.current = true;
				setIndex(minEdge.current);
			}

			if (currentIndexRef.current < minEdge.current) {
				// console.log('min overflow');
				isOverflow.current = true;
				setIndex(maxEdge.current);
			}
		},
	}));
	const theme = useTheme();
	const isViewLg = useMediaQuery(theme.breakpoints.up('md'));
	const classes = useStyle();

	useEffect(() => {
		// Initial all params
		const length = oriImages.length;
		minEdge.current = 2;
		maxEdge.current = minEdge.current + length - 1;

		// add 2 images at start, and 2 at end
		setImages([oriImages[length - 2], oriImages[length - 1], ...oriImages, oriImages[0], oriImages[1]]);
		setIndex(minEdge.current);
	}, [oriImages]);

	useEffect(() => {
		const autoScrollId = setInterval(() => {
			setIndex((prev) => prev + 1);
		}, AUTO_SCROLL_TIMER);

		return () => {
			clearInterval(autoScrollId);
		};
	}, []);

	const marginInline = isViewLg ? 12 : viewPagerWidth * 0.02;
	const imageWidth = isViewLg ? (45 * 15.7) / 0.5625 : viewPagerWidth * 0.98;

	useEffect(() => {
		const transDistance = imageWidth + marginInline * 2;
		const bias = (viewPagerWidth - transDistance) / 2;
		// translateX can't larger then 0 (but that's ok in react-spring)
		isOverflow.current
			? api.start({
					x: -1 * (index * transDistance - bias),
					immediate: true,
			  })
			: api.start({
					x: -1 * (index * transDistance - bias),
			  });

		// update currentIndexRef
		currentIndexRef.current = index;
		isOverflow.current && (isOverflow.current = false);
	}, [index, isViewLg]);

	const handleNext = () => {
		if (isTransiting.current) {
			return; // prevent double click
		}
		setIndex((prev) => prev + 1);
	};

	const handlePrev = () => {
		if (isTransiting.current) {
			return;
		}
		setIndex((prev) => prev - 1);
	};

	return (
		<div ref={viewPagerRef} className={classes.carousel}>
			<animated.div ref={imagesContainerRef} className={classes.imagesContainer} style={position}>
				{images.map((image, key) => (
					<div
						className={`${classes.imageCard}`}
						style={{
							width: imageWidth,
							marginInline: marginInline,
							backgroundImage: `url(${image.imageLink})`,
						}}
						key={key}
					></div>
				))}
			</animated.div>
			<div className={classes.navButtonsContainer}>
				{oriImages.map((_, key) => {
					return (
						<NavButton
							isSelected={minEdge.current + key == index}
							onClick={() => {
								setIndex(minEdge.current + key);
							}}
							key={key}
						/>
					);
				})}
			</div>
			<IconButton className={`${classes.iconButton} right`} onClick={handleNext}>
				<ArrowForwardIcon />
			</IconButton>
			<IconButton className={`${classes.iconButton} left`} onClick={handlePrev}>
				<ArrowBackIcon />
			</IconButton>
		</div>
	);
}
