import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExperienceItem from '../../components/shared/experienceItem';
import PopupAnimate from '../../components/shared/popupAnimate';

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

export default function Experience() {
	const { classes } = useStyle();
	return (
		<section className={classes.experiences}>
			<Typography variant="h1" className={classes.title}>
				{'Experiences'}
			</Typography>
			<div className={classes.description}>
				<Typography variant="body1">
					{`
						Nearly a decade of engineering experience spanning web products, marketplace and CMS
						platforms, embedded firmware, production tooling, quality ownership, and
						cross-functional delivery.
					`}
				</Typography>
			</div>
			<div className={classes.skills}>
				<div>
					<Typography variant="h2">{'Core Engineering'}</Typography>
					<Typography variant="body1">
						{'TypeScript, JavaScript, React, Next.js, SvelteKit, HTML, CSS, SQL'}
					</Typography>
					<Typography variant="body1">
						{'GraphQL, Supabase, PostgreSQL, API integration, frontend architecture'}
					</Typography>
				</div>
				<div>
					<Typography variant="h2">{'Quality & Delivery'}</Typography>
					<Typography variant="body1">
						{'A/B testing, QA planning, feature flags, bug bash coordination, root-cause debugging'}
					</Typography>
					<Typography variant="body1">
						{'Prismic, Amplitude, Redash, Coralogix, Jira, GitHub Actions, CI/CD'}
					</Typography>
				</div>
			</div>
			<div className={classes.items}>
				<Divider className={classes.divider} />
				<PopupAnimate>
					<ExperienceItem
						year={'2022 - 2026'}
						role={'Software Engineer'}
						company={'Houzz | Marketplace, Lead Nurture, and 3D'}
						highlights={[
							'Delivered marketplace search and browse improvements across desktop and mobile web, including A/B-tested discovery experiences.',
							'Built reusable Prismic CMS page patterns with GraphQL schema and resolver support for landing pages, campaigns, and event experiences.',
							'Integrated frontend workflows with personalization, 3D, and external AI services while working across product, platform, backend, and data teams.',
							'Improved release quality through design docs, feature flags, QA guides, bug bashes, production debugging, analytics, and release monitoring.',
						]}
					/>
				</PopupAnimate>
				<Divider className={classes.divider} />
				<PopupAnimate>
					<ExperienceItem
						year={'2020 - 2022'}
						role={'Frontend Engineer'}
						company={'Chung Yung Consultant Company | Taipei'}
						highlights={[
							'Built responsive membership and administration applications using React, Next.js, TypeScript, HTML, and CSS.',
							'Implemented authentication and state flows with XState, API integrations, form-driven interfaces, and PostgreSQL changes.',
							'Supported GitHub-based CI/CD and GitOps deployment workflows on cloud infrastructure.',
						]}
					/>
				</PopupAnimate>
				<Divider className={classes.divider} />
				<PopupAnimate>
					<ExperienceItem
						year={'2016 - 2020'}
						role={'Firmware & Application Engineer'}
						company={'Foxconn, Mega Design Tech, and Memoright Tech | Hsinchu'}
						highlights={[
							'Developed embedded firmware, memory-controller test patterns, and production application tooling using C, C++, and C#.',
							'Established Ceedling unit tests for driver development to improve test coverage and reliability.',
						]}
					/>
				</PopupAnimate>
				<Divider className={classes.divider} />
				<Divider className={classes.divider} />
			</div>
		</section>
	);
}
