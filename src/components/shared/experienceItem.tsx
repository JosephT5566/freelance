import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';

const useStyle = makeStyles()((theme) => ({
	experienceItem: {
		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr) auto',
		columnGap: '2rem',
		padding: '2rem 0',
		[theme.breakpoints.down('sm')]: {
			columnGap: '1rem',
			gridTemplateColumns: 'minmax(0, 1fr)',
			padding: '1.5rem 0',
		},
		'& .year': {
			fontFamily: 'Lobster',
			fontSize: '2rem',
			fontWeight: 'normal',
			lineHeight: 1.2,
			gridColumn: '2',
			gridRow: '1',
			margin: 0,
			textAlign: 'right',
			whiteSpace: 'nowrap',
			color: theme.palette.primary.light,
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.25rem',
				gridColumn: '1',
				gridRow: '2',
				textAlign: 'left',
				marginTop: '0.75rem',
			},
		},
		'& .heading': {
			gridColumn: '1',
			gridRow: '1',
		},
		'& .role': {
			color: theme.palette.primary.light,
		},
		'& .company': {
			marginBottom: '0.35rem',
			fontWeight: 500,
			fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
			overflowWrap: 'anywhere',
		},
		'& .highlights': {
			gridColumn: '1 / span 2',
			gridRow: '2',
			marginTop: '1.25rem',
			[theme.breakpoints.down('sm')]: { gridColumn: '1', gridRow: '3' },
		},
		'& ul': {
			margin: 0,
			paddingLeft: '1.2rem',
		},
		'& li': {
			marginBottom: '0.55rem',
		},
	},
}));

export default function ExperienceItem(props: {
	year: string;
	role: string;
	company: string;
	highlights: string[];
	headingComponent?: 'h2' | 'h3';
}) {
	const { year, role, company, highlights, headingComponent = 'h2' } = props;
	const { classes } = useStyle();

	return (
		<article className={classes.experienceItem}>
			<div className={'heading'}>
				<Typography className={'company'} variant="h2" component={headingComponent}>
					{company}
				</Typography>
				<Typography className={'role'} variant="body1">
					{role}
				</Typography>
			</div>
			<p className={'year'}>{year}</p>
			{highlights.length > 0 && (
				<div className={'highlights'}>
					<ul>
						{highlights.map((highlight) => (
							<li key={highlight}>
								<Typography variant="body1">{highlight}</Typography>
							</li>
						))}
					</ul>
				</div>
			)}
		</article>
	);
}
