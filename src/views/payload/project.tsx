import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PopupAnimate from '../../components/shared/popupAnimate';

const useStyle = makeStyles()((theme) => ({
	project: {
		[theme.breakpoints.up('md')]: {
			width: '100vw',
			height: '100vh',
			padding: '6rem',
			flexShrink: '0',

			display: 'grid',
			gridTemplateColumns: '66% 33%',
			gridTemplateRows: 'repeat(7, 1fr)',
			gridGap: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginBottom: '1em',
		},
	},
	title: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '1 / span 2',
			gridRow: '1 / 1',
		},
		[theme.breakpoints.down('sm')]: {
			alignSelf: 'flex-start',
			marginBottom: '0.5em',
		},
	},
	descriptionTitle: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '2 / 2',
		},
		[theme.breakpoints.down('sm')]: {
			alignSelf: 'flex-start',
			paddingLeft: '0.5rem',
			marginBottom: '0.5em',
		},
	},
	description: {
		width: '100%',
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '3 / span 3',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '0 0.5rem',
		},
		'& > hr': {
			marginBottom: '1em',
		},
		'& .content': {
			marginBottom: '1em',
		},
	},
	image: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: '0.5em',
		[theme.breakpoints.up('md')]: {
			gridColumn: '1 / 1',
			gridRow: '2 / span 6',
		},
		[theme.breakpoints.down('sm')]: {
			width: 'calc(100% - 1em)',
			paddingTop: '56.25%',
		},
		'&.default': {
			backgroundColor: theme.palette.background.paper,
			padding: '1em',
			display: 'flex',
			alignItems: 'flex-end',
			color: theme.palette.text.secondary,
			fontSize: '2em',
			[theme.breakpoints.down('sm')]: {
				alignItems: 'flex-start',
			},
			'& > h1': {
				fontFamily: 'Lobster',
			},
		},
		'&:hover': {
			cursor: 'pointer',
		},
	},
	tools: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2',
			gridRow: '6 / span 2',
			alignSelf: 'end',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '0 0.5rem',
			alignSelf: 'flex-end',
		},
	},
}));

export default function Project(props: {
	title: string;
	description?: string;
	image?: string;
	url?: string;
	tools?: string[];
}) {
	const { title, description, image, url, tools } = props;
	const { classes } = useStyle();
	const theme = useTheme();
	const isViewPortLarge = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<div className={classes.project}>
			<Typography className={classes.title} variant={'h1'}>
				{title}
			</Typography>
			{image ? (
				<div
					className={classes.image}
					style={{ backgroundImage: `url(${image})` }}
					onClick={() => url && window.open(url, '_blank').focus()}
				></div>
			) : (
				<div className={`${classes.image} default`}>
					<PopupAnimate disabled={isViewPortLarge}>
						<Typography variant={'h1'}>{'Coming Soon...'}</Typography>
					</PopupAnimate>
				</div>
			)}
			{description && (
				<article>
					<Typography className={classes.descriptionTitle} variant={'h2'}>
						{'Description'}
					</Typography>
					<div className={classes.description}>
						<PopupAnimate disabled={isViewPortLarge}>
							<Typography className={'content'} variant={'body1'}>
								{description}
							</Typography>
						</PopupAnimate>
						<Divider />
					</div>
				</article>
			)}
			{tools && (
				<div className={classes.tools}>
					{tools.map((tool, index) => (
						<Typography key={index} variant={'body1'}>
							{tool}
						</Typography>
					))}
				</div>
			)}
		</div>
	);
}
