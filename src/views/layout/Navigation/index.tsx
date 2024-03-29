import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IndexProvider } from './IndexProvider';
import useLocation from '../../../hooks/useLocation';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Button from './Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Snackbar, { defaultSnackbarProps } from '../../../components/shared/snackbar';

import { debounce } from '../../../utils/helpers';

const useStyle = makeStyles()((theme) => ({
	navigation_lg: {
		position: 'fixed',
		top: '0.5em',
		display: 'flex',
		width: '100%',

		zIndex: theme.zIndex.speedDial - 1,
		padding: '1em 0',
		transition: '0.6s',
		'&.false': {
			top: '-4.5em',
		},
	},
	navigation_md: {
		position: 'fixed',
		display: 'flex',
		zIndex: theme.zIndex.drawer,

		right: `-${theme.typography.navWidth}`,
		height: '100vh',
		width: theme.typography.navWidth,
		backgroundColor: theme.palette.background.paper,
		transition: '0.6s',
		'&.true': {
			right: '0',
		},
	},
	itemsContainer: {
		display: 'flex',
		width: '100%',
		padding: '0 1em',

		[theme.breakpoints.up('md')]: {
			justifyContent: 'space-between',
		},
		[theme.breakpoints.down('sm')]: {
			paddingTop: theme.typography.headerHeight,
			flexDirection: 'column',
		},
	},
	navButton: {
		position: 'fixed',
		top: '0.4em',
		right: '0.2em',
		color: theme.palette.primary.main,
		padding: '0.5em 0.8em',
		borderRadius: '0.5em',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));

const Items = (props: { btnClicked?: any }) => {
	const { btnClicked = null } = props;
	const router = useRouter();
	const [snackbarProps, setSnackbarProps] = useState(defaultSnackbarProps);
	const url = useLocation();

	const handleCloseSnackbar = () => {
		setSnackbarProps((prev) => ({ ...prev, open: false }));
	};

	const copyEmail = async () => {
		await navigator.clipboard.writeText(`zxp930110@hotmail.com.tw`); // copy to clipboard
		setSnackbarProps((prev) => ({
			...prev,
			open: true,
			severity: 'success',
			message: 'e-mail address copied',
		}));
	};

	return (
		<IndexProvider>
			<Button
				index={1}
				onClick={() => {
					router.push(`/projects`);
					btnClicked && btnClicked();
				}}
			>
				Projects
			</Button>
			<Button
				index={2}
				onClick={async () => {
					await copyEmail();
					btnClicked && btnClicked();
				}}
			>
				Contact me
			</Button>
			<Snackbar snackbarProps={snackbarProps} onClose={handleCloseSnackbar} />
		</IndexProvider>
	);
};

const NavigatorLg = () => {
	const { classes } = useStyle();

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = debounce(() => {
		// find current scroll position
		const currentScrollPos = window.pageYOffset;

		// set state based on location info (explained in more detail below)
		setVisible(
			(prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30) || currentScrollPos < 10
		);

		// set state to new scroll position
		setPrevScrollPos(currentScrollPos);
	}, 100);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, visible, handleScroll]);

	return (
		<nav className={`${classes.navigation_lg} ${visible}`}>
			<div className={classes.itemsContainer}>
				<div style={{ width: '144px', zIndex: -1 }}></div>
				<Items />
			</div>
		</nav>
	);
};

const NavigatorMd = () => {
	const { classes } = useStyle();
	const [visible, setVisible] = useState(false);

	const handleClick = () => {
		setVisible((prev) => !prev);
	};

	const handleClickAway = () => {
		if (visible) {
			setVisible(false);
		}
	};

	const handleButtonClicked = () => {
		setVisible(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<nav className={`${classes.navigation_md} ${visible}`}>
				<div className={classes.itemsContainer}>
					<IconButton className={classes.navButton} aria-label="menu" onClick={handleClick}>
						<MenuIcon />
					</IconButton>
					<Items btnClicked={handleButtonClicked} />
				</div>
			</nav>
		</ClickAwayListener>
	);
};

export default function Navigator() {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.up('md')) ? <NavigatorLg /> : <NavigatorMd />;
}
