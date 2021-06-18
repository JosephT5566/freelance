import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
		[theme.breakpoints.down('sm')]: {},
	},
	title: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '1 / span 2',
			gridRow: '1 / 1',
		},
	},
	descriptionTitle: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '2 / 2',
		},
	},
	description: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '3 / span 3',
		},
		'& > p': {
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
		'&.default': {
			backgroundColor: theme.palette.background.paper,
			fontFamily: 'Lobster',
			padding: '1em',
			display: 'flex',
			alignItems: 'flex-end',
			color: theme.palette.text.secondary,
			fontSize: '2em',
		},
	},
	tools: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2',
			gridRow: '6 / span 2',
			alignSelf: 'end',
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
			<Typography variant={'h1'}>{title}</Typography>
			{image ? (
				<div className={classes.image} style={{ backgroundImage: `url(${image})` }}></div>
			) : (
				<div className={`${classes.image} default`}>
					<h1>{'Coming Soon...'}</h1>
				</div>
			)}
			{description && (
				<>
					<Typography className={classes.descriptionTitle} variant={'h2'}>
						{'Description'}
					</Typography>
					<div className={classes.description}>
						<Typography variant={'body1'}>{description}</Typography>
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
