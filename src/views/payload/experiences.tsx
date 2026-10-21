import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExperienceItem from '../../components/shared/experienceItem';
import Link from 'next/link';
import { experiences, experienceIntro, houzzSummary, skillGroups } from '../../content/experience';

const useStyle = makeStyles()((theme) => ({
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
	skills: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gap: '2rem',
		marginBottom: '3rem',
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '1fr',
			padding: '0 2em',
		},
		'& h2': {
			marginBottom: '0.75rem',
		},
		'& p': {
			marginBottom: '0.5rem',
		},
	},
	items: {
		[theme.breakpoints.down('sm')]: {
			padding: '0 2em',
		},
	},
}));

export default function Experience({ full = false }: { full?: boolean }) {
	const { classes } = useStyle();
	return (
		<section className={classes.experiences} aria-labelledby="experience-title">
			<Typography variant="h1" component={full ? 'h1' : 'h2'} className={classes.title} id="experience-title">
				{full ? 'Experience' : 'Professional Experience'}
			</Typography>
			<div className={classes.description}>
				<Typography variant="body1">
					{full
						? experienceIntro
						: 'Frontend and product engineering at Houzz, grounded in earlier web application and firmware work.'}
				</Typography>
			</div>
			{full && (
				<div className={classes.skills}>
					{skillGroups.map((group) => (
						<div key={group.title}>
							<Typography variant="h2">{group.title}</Typography>
							{group.lines.map((line) => (
								<Typography key={line} variant="body1">
									{line}
								</Typography>
							))}
						</div>
					))}
				</div>
			)}
			<div className={classes.items}>
				<Divider className={classes.divider} />
				{experiences.map((experience, index) => (
					<React.Fragment key={experience.company}>
						<ExperienceItem
							{...experience}
							headingComponent={full ? 'h2' : 'h3'}
							highlights={full ? experience.highlights : index === 0 ? houzzSummary : []}
						/>
						<Divider className={classes.divider} />
					</React.Fragment>
				))}
				{!full && (
					<p>
						<Link href="/experience/">View full experience and skills</Link>
					</p>
				)}
			</div>
		</section>
	);
}
