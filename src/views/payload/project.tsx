import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PopupAnimate from '../../components/shared/popupAnimate';

const useStyle = makeStyles((theme) => ({
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
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '3 / span 3',
		},
		'& > hr': {
			marginBottom: '1em',
		},
		'& .content': {
			marginBottom: '1em',
			[theme.breakpoints.down('sm')]: {
				padding: '0 0.5rem',
			},
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
			aspectRatio: '16/9',
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

export default function Function(props: {
	title: string;
	description?: string;
	image?: string;
	url?: string;
	tools?: string[];
}) {
	const { title, description, image, tools } = props;
	const classes = useStyle();

	return (
		<div className={classes.project}>
			<Typography className={classes.title} variant={'h1'}>
				{title}
			</Typography>
			{image ? (
				<div className={classes.image} style={{ backgroundImage: `url(${image})` }}></div>
			) : (
				<div className={`${classes.image} default`}>
					<PopupAnimate>
						<Typography variant={'h1'}>{'Coming Soon...'}</Typography>
					</PopupAnimate>
				</div>
			)}
			{description && (
				<>
					<Typography className={classes.descriptionTitle} variant={'h2'}>
						{'Description'}
					</Typography>
					<div className={classes.description}>
						<PopupAnimate>
							<Typography className={'content'} variant={'body1'}>
								{description}
							</Typography>
						</PopupAnimate>
						<Divider />
					</div>
				</>
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
