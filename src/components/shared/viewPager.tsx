import React, { useState, useEffect, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { makeStyles } from '@material-ui/core/styles';
import { useDrag } from 'react-use-gesture';
import _ from 'lodash';

import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const useStyle = makeStyles((theme) => ({
	viewPager: {
		position: 'relative',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
	},
	pagesContainer: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		margin: '0 auto',
		height: '100%', // decide width by js
		maxWidth: '100%',
		overflow: 'hidden',
		[theme.breakpoints.up('md')]: {
			overflow: 'initial',
		},
	},
	page: {
		position: 'absolute',
		top: 0,
		width: '98%',
		height: '100%',
		willChange: 'transform',
		// [theme.breakpoints.up('md')]: {
		// 	width: '98%',
		// },
		'& .image': {
			touchAction: 'none',
			borderRadius: '0.5rem',
			width: '100%',
			height: '100%',
			willChange: 'transform',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			cursor: 'grab',
		},
	},
	arrowBtn: {
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
		'&.next': {
			right: '5%',
		},
		'&.previous': {
			left: '5%',
		},
	},
	pageDots: {
		display: 'flex',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		bottom: '0',
		left: '50%',
		transform: 'translate(-50%, 0)',
	},
	pageDot: {
		padding: '0 0.2em',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	dotIcon: {
		color: 'white',
	},
}));

export class PageType {
	imageLink: string = '';
	content: string = '';
}

const PageDots = (props: {
	pages: any[];
	index: number;
	setIndex: any;
	pageIndexRef: React.MutableRefObject<number>;
	action: any;
}) => {
	const { pages, index, setIndex, pageIndexRef, action } = props;
	const classes = useStyle();

	return (
		<div className={classes.pageDots}>
			{pages.map((_, i) => (
				<div
					className={classes.pageDot}
					key={i}
					onClick={() => {
						pageIndexRef.current = i;
						action();
						setIndex(pageIndexRef.current);
					}}
				>
					{i === index ? (
						<FiberManualRecordIcon className={classes.dotIcon} fontSize="small" />
					) : (
						<FiberManualRecordOutlinedIcon className={classes.dotIcon} fontSize="small" />
					)}
				</div>
			))}
		</div>
	);
};

const defaultPages = new Array<PageType>();

const useWidth = (ref: React.MutableRefObject<any>): number => {
	const [width, setWidth] = useState(0);

	const updateWidth = () => {
		ref.current && setWidth(ref.current.clientWidth);
	};

	useEffect(() => {
		updateWidth();
		window.addEventListener('resize', updateWidth);

		return () => window.removeEventListener('resize', updateWidth);
	}, [updateWidth]);

	return width;
};

export default function ViewPager(props: { pages: PageType[] }) {
	const { pages = defaultPages } = props;
	const classes = useStyle();
	const [dotIndex, setDotIndex] = useState(0);
	const pageIndexRef = useRef(0);
	const containerRef = useRef(null);

	const width = useWidth(containerRef);
	const count = pages.length;
	const offsetArray = useRef([0]);
	offsetArray.current = pages.map((_, index) => (index < Math.ceil(count / 2) ? index : index - count));

	const currentNext = (): number => (pageIndexRef.current + 1 > count - 1 ? 0 : pageIndexRef.current + 1);

	const currentPrev = (): number => (pageIndexRef.current - 1 < 0 ? count - 1 : pageIndexRef.current - 1);

	const [springs, api] = useSprings(
		count,
		(item) => ({
			x: offsetArray.current[item] * width,
			display: 'block',
		}),
		[width]
	);

	const apiStart = () => {
		api.start((item) => {
			const newPosition = (item - pageIndexRef.current + count) % count;
			const x = offsetArray.current[newPosition] * width;
			return item != currentNext() && item != currentPrev() && item != pageIndexRef.current
				? { x, display: 'none' }
				: { x, display: 'block' };
		});
	};

	useEffect(() => {
		const intervalID = setInterval(() => {
			pageIndexRef.current = currentNext();
			apiStart();
			setDotIndex(pageIndexRef.current);
		}, 10000);

		return () => {
			clearInterval(intervalID);
		};
	}, [apiStart, currentNext, setDotIndex]);

	const bind = useDrag(
		({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
			if (active && distance > width / 3) {
				pageIndexRef.current = xDir > 0 ? currentPrev() : currentNext();
				cancel();
			}
			api.start((item) => {
				const newPosition = (item - pageIndexRef.current + count) % count;
				const x = offsetArray.current[newPosition] * width + (active ? mx : 0);
				return item != currentNext() && item != currentPrev() && item != pageIndexRef.current
					? { x, display: 'none' }
					: { x, display: 'block' };
			});
			setDotIndex(pageIndexRef.current);
		},
		{ filterTaps: true } // click will not be executed when dragging
	);

	const handleClickNext = () => {
		pageIndexRef.current = currentNext();
		apiStart();
		setDotIndex(pageIndexRef.current);
	};

	const handleClickPrev = () => {
		pageIndexRef.current = currentPrev();
		apiStart();
		setDotIndex(pageIndexRef.current);
	};

	return (
		<div className={classes.viewPager}>
			<IconButton className={`${classes.arrowBtn} next`} onClick={handleClickNext}>
				<ArrowForwardIcon />
			</IconButton>
			<IconButton className={`${classes.arrowBtn} previous`} onClick={handleClickPrev}>
				<ArrowBackIcon />
			</IconButton>
			<div
				className={classes.pagesContainer}
				ref={containerRef}
				style={{ width: containerRef.current ? containerRef.current.offsetHeight / 0.5625 : 0 }}
			>
				{springs.map(({ x, display }, i) => (
					<animated.div className={classes.page} {...bind()} key={i} style={{ display, x }}>
						<animated.div
							className="image"
							style={{ backgroundImage: `url(${pages[i].imageLink})` }}
							onClick={() => pages[i].content && window.open(pages[i].content, '_blank').focus()}
						/>
					</animated.div>
				))}
			</div>
			<PageDots
				pages={pages}
				index={dotIndex}
				setIndex={setDotIndex}
				pageIndexRef={pageIndexRef}
				action={apiStart}
			/>
		</div>
	);
}

export function ViewPager_finite_scroll(props: { pages: PageType[] }) {
	const { pages = defaultPages } = props;
	const classes = useStyle();
	const [dotIndex, setDotIndex] = useState(0);
	const pageIndexRef = useRef(0);
	const containerRef = useRef(null);

	const width = useWidth(containerRef);

	const currentNext = (): number => (pageIndexRef.current + 1 > pages.length - 1 ? 0 : pageIndexRef.current + 1);

	const currentPrev = (): number => (pageIndexRef.current - 1 < 0 ? pages.length - 1 : pageIndexRef.current - 1);

	const [springs, api] = useSprings(
		pages.length,
		(item) => ({
			x: item * width,
			display: 'block',
		}),
		[width]
	);

	const apiStart = () => {
		api.start((item) => {
			const x = (item - pageIndexRef.current) * width;
			return { x, display: 'block' };
		});
	};

	useEffect(() => {
		const intervalID = setInterval(() => {
			pageIndexRef.current = currentNext();
			apiStart();
			setDotIndex(pageIndexRef.current);
		}, 10000);

		return () => {
			clearInterval(intervalID);
		};
	}, [apiStart, currentNext, setDotIndex]);

	const bind = useDrag(
		({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
			if (active && distance > width / 3) {
				pageIndexRef.current = _.clamp(pageIndexRef.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1);
				cancel();
			}
			api.start((item) => {
				const x = (item - pageIndexRef.current) * width + (active ? mx : 0);
				return { x, display: 'block' };
			});
			setDotIndex(pageIndexRef.current);
		},
		{ filterTaps: true } // click will not be executed when dragging
	);

	const handleClickNext = () => {
		pageIndexRef.current = currentNext();
		apiStart();
		setDotIndex(pageIndexRef.current);
	};

	const handleClickPrev = () => {
		pageIndexRef.current = currentPrev();
		apiStart();
		setDotIndex(pageIndexRef.current);
	};

	return (
		<div className={classes.viewPager}>
			<IconButton className={`${classes.arrowBtn} next`} onClick={handleClickNext}>
				<ArrowForwardIcon />
			</IconButton>
			<IconButton className={`${classes.arrowBtn} previous`} onClick={handleClickPrev}>
				<ArrowBackIcon />
			</IconButton>
			<div
				className={classes.pagesContainer}
				ref={containerRef}
				style={{ width: containerRef.current ? containerRef.current.offsetHeight / 0.5625 : 0 }}
			>
				{springs.map(({ x, display }, i) => (
					<animated.div className={classes.page} {...bind()} key={i} style={{ display, x }}>
						<animated.div
							className="image"
							style={{ backgroundImage: `url(${pages[i].imageLink})` }}
							onClick={() => pages[i].content && window.open(pages[i].content, '_blank').focus()}
						/>
					</animated.div>
				))}
			</div>
			<PageDots
				pages={pages}
				index={dotIndex}
				setIndex={setDotIndex}
				pageIndexRef={pageIndexRef}
				action={apiStart}
			/>
		</div>
	);
}
