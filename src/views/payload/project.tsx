import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
	project: {
		[theme.breakpoints.up('md')]: {
			width: '100vw',
			height: '100vh',
			padding: '7% 5%',
			flexShrink: '0',
		},
		[theme.breakpoints.down('sm')]: {},
	},
	image: {
		width: '50%',
		height: '50%',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: '0.5em',
	},
}));

export default function Function(props: {
	title: string;
	description: string;
	image: string;
	url: string;
	tools: string[];
}) {
	const { title, description, image, tools } = props;
	const classes = useStyle();

	return (
		<div className={classes.project}>
			<Typography variant={'h1'}>{title}</Typography>
			<div className={classes.image} style={{ backgroundImage: `url(${image})` }}></div>
			<Typography variant={'h1'}>{'Description'}</Typography>
			<Typography variant={'body1'}>{description}</Typography>
			<Divider />
			{tools.map((tool, index) => (
				<Typography key={index} variant={'body1'}>
					{tool}
				</Typography>
			))}
		</div>
	);
}
