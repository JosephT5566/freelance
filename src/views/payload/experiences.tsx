import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExperienceItem from '../../components/shared/experienceItem';
import PopupAnimate from '../../components/shared/popupAnimate';

const useStyle = makeStyles((theme) => ({
	experiences: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		padding: '0 16.6%',
		marginBottom: '95px',
		[theme.breakpoints.down('sm')]: {
			padding: '0',
		},
	},
	title: {
		padding: '1em 0',
	},
	divider: {
		backgroundColor: theme.palette.primary.light,
	},
	description: {
		display: 'grid',
		marginBottom: '2em',
		gridTemplateColumns: 'repeat(2, 1fr)',
		[theme.breakpoints.down('sm')]: {
			padding: '0 2em',
		},
		'& > p': {
			gridColumn: '2 / 2',
			[theme.breakpoints.down('sm')]: {
				gridColumn: '1 / span 2',
			},
		},
	},
	items: {
		[theme.breakpoints.down('sm')]: {
			padding: '0 2em',
		},
	},
}));

export default function Experience() {
	const classes = useStyle();
	return (
		<div className={classes.experiences}>
			<Typography variant="h1" className={classes.title}>
				{'Experiences'}
			</Typography>
			<div className={classes.description}>
				<Typography variant="body1">
					{`
						Join the front-end is 1 year although, I've been an engineer about 4 years.
						In my opinion, the program is not just a complicated and confusing data manager,
						but can be used as a kind of creative tool.
					`}
				</Typography>
			</div>
			<div className={classes.items}>
				<Divider className={classes.divider} />
				<PopupAnimate>
					<ExperienceItem
						year={'-2019'}
						description={`
							F/W engineer in Memoright and Socle tech. Develop, maintain and test system drivers
						`}
					/>
				</PopupAnimate>
				<Divider className={classes.divider} />
				<PopupAnimate>
					<ExperienceItem
						year={'2020'}
						description={`
							After leaving the original job and having an unforgettable time in green island,
							I've been hired to a start up company for front-end develop.
						`}
					/>
				</PopupAnimate>
				<Divider className={classes.divider} />
				<PopupAnimate>
					<ExperienceItem
						year={'2021'}
						description={`
							Keep working on front-end. I help to build a member system, in addition to websites for general user
							and administrator, and also back-end maintenance.
						`}
					/>
				</PopupAnimate>
				<Divider className={classes.divider} />
			</div>
		</div>
	);
}
