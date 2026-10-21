import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ExperienceItem from '../../components/shared/experienceItem';
import { experiences, experienceIntro, houzzSummary, skillGroups } from '../../content/experience';

const useStyles = makeStyles()((theme) => ({
	section: {
		paddingBlock: 64,
		borderTop: '1px solid rgba(37,66,81,.25)',
		[theme.breakpoints.down('sm')]: { paddingBlock: 48 },
	},
	heading: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		alignItems: 'end',
		gap: 48,
		marginBottom: 32,
		[theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: 20 },
	},
	intro: { margin: 0, maxWidth: 560 },
	skills: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: 40,
		padding: '24px 0 40px',
		'& h2': { fontSize: 28, marginBottom: 16 },
		[theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: 24 },
	},
}));

export default function Experience({ full = false }: { full?: boolean }) {
	const { classes } = useStyles();
	return (
		<section
			className={`site-container ${classes.section}`}
			id="experience"
			aria-labelledby="experience-title"
		>
			<div className={classes.heading}>
				<div>
					<p className="section-kicker">Professional experience</p>
					<Typography variant={full ? 'h1' : 'h2'} component={full ? 'h1' : 'h2'} id="experience-title">
						{full ? 'Experience & skills' : 'A decade of building.'}
					</Typography>
				</div>
				<Typography variant="body1" className={classes.intro}>
					{full
						? experienceIntro
						: 'Frontend and product engineering at Houzz, grounded in earlier web application and firmware work.'}
				</Typography>
			</div>
			{full && (
				<div className={classes.skills}>
					{skillGroups.map((group) => (
						<div key={group.title}>
							<Typography variant="h2" component="h2">
								{group.title}
							</Typography>
							{group.lines.map((line) => (
								<Typography key={line} variant="body1">
									{line}
								</Typography>
							))}
						</div>
					))}
				</div>
			)}
			{experiences.map((experience, index) => (
				<ExperienceItem
					key={experience.company}
					{...experience}
					headingComponent={full ? 'h2' : 'h3'}
					highlights={full ? experience.highlights : index === 0 ? houzzSummary : []}
				/>
			))}
			{!full && (
				<Link className="text-link" style={{ marginTop: 24 }} href="/experience/">
					Full experience and skills <ArrowUpRight size={17} aria-hidden="true" />
				</Link>
			)}
		</section>
	);
}
