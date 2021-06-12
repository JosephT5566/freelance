import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExperienceItem from '../../components/shared/experienceItem';

const useStyle = makeStyles((theme) => ({
	experiences: {
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		padding: '95px 16.6%',
	},
	divider: {
		backgroundColor: theme.palette.primary.light,
	},
	container: {
		display: 'relative',
	},
	description: {
		display: 'grid',
		marginBottom: '2em',
		gridTemplateColumns: 'repeat(2, 1fr)',
		'& > p': {
			gridColumn: '2 / 2',
		},
	},
	item: {
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

export default function Experience() {
	const classes = useStyle();
	return (
		<div className={classes.experiences}>
			<Typography variant="h1">{'Experiences'}</Typography>
			<div className={classes.description}>
				<Typography variant="body1">
					{
						'Maecenas vitae ligula nulla. Donec euismod mauris risus, eget eleifend diam tempus sed. Cras vitae ex mauris. '
					}
				</Typography>
			</div>
			<Divider className={classes.divider} />
			<ExperienceItem
				year={'2019'}
				description={
					'Maecenas vitae ligula nulla. Donec euismod mauris risus, eget eleifend diam tempus sed. Cras vitae ex mauris. '
				}
			/>
			<Divider className={classes.divider} />
			<ExperienceItem
				year={'2020'}
				description={
					'Maecenas vitae ligula nulla. Donec euismod mauris risus, eget eleifend diam tempus sed. Cras vitae ex mauris. '
				}
			/>
			<Divider className={classes.divider} />
			<ExperienceItem
				year={'2021'}
				description={
					'Maecenas vitae ligula nulla. Donec euismod mauris risus, eget eleifend diam tempus sed. Cras vitae ex mauris. '
				}
			/>
			<Divider className={classes.divider} />
		</div>
	);
}
