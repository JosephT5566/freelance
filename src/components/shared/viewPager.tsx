import React, { useState, useEffect, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { makeStyles } from '@material-ui/core/styles';
import { useDrag } from 'react-use-gesture';
import _ from 'lodash';

import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

const useStyle = makeStyles((theme) => ({
	viewPager: {
		position: 'relative',
		marginBottom: '1em',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		[theme.breakpoints.up('md')]: {
			padding: '0 4%',
		},
	},
	pagesContainer: {
		position: 'relative',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		display: 'block',
		[theme.breakpoints.up('md')]: {
			overflow: 'initial',
		},
	},
	page: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		willChange: 'transform',
		[theme.breakpoints.up('md')]: {
			width: '99%',
			paddingLeft: '1%',
		},
		'& .image': {
			touchAction: 'none',
			borderRadius: '0.5rem',
			width: '100%',
			height: '100%',
			willChange: 'transform',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			cursor: 'pointer',
		},
	},
	arrowBtn: {
		color: theme.palette.primary.main,
		position: 'absolute',
		zIndex: 1,
		top: '50%',
		transform: 'translate(0, -50%)',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.6)',
		},
		'&.next': {
			right: '0',
		},
		'&.previous': {
			left: '0',
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

interface Page {
	imageLink: string;
	content: string;
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

const defaultPages = [{ imageLink: '', content: '' }];

const useWidth = (ref: React.MutableRefObject<any>): number => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		return !!ref.current && setWidth(ref.current.clientWidth);
	}, [ref.current?.clientWidth]);

	return width;
};

export default function ViewPager(props: { pages: Page[] }) {
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
				<NavigateNextIcon />
			</IconButton>
			<IconButton className={`${classes.arrowBtn} previous`} onClick={handleClickPrev}>
				<NavigateBeforeIcon />
			</IconButton>
			<div className={classes.pagesContainer} ref={containerRef}>
				{springs.map(({ x, display }, i) => (
					<animated.div className={classes.page} {...bind()} key={i} style={{ display, x }}>
						<animated.div
							className="image"
							style={{ backgroundImage: `url(${pages[i].imageLink})` }}
							onClick={() => {
								window.open(pages[i].content, '_blank').focus();
							}}
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
