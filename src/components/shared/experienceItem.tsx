import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
	experienceItem: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		'& .year': {
			fontFamily: 'Lobster',
			fontSize: '4rem',
			gridColumn: '1 / 1',
			color: theme.palette.primary.light,
		},
		'& .content': {
			gridColumn: '2 / 2',
			alignSelf: 'center',
		},
	},
}));

export default function ExperienceItem(props: { year: string; description: string }) {
	const { year, description } = props;
	const classes = useStyle();

	return (
		<div className={classes.experienceItem}>
			<h1 className={'year'}>{year}</h1>
			<Typography className={'content'} variant="body1">
				{description}
			</Typography>
		</div>
	);
}
