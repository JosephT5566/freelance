import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import type { ExperienceRecord } from '../../content/experience';

const useStyles = makeStyles()((theme) => ({
	item: {
		display: 'grid',
		gridTemplateColumns: '160px minmax(0, 1fr)',
		gap: '12px 32px',
		padding: '28px 0',
		borderTop: '1px solid rgba(37,66,81,.18)',
		[theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', padding: '24px 0', gap: 8 },
	},
	year: { margin: '4px 0 0', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' },
	company: {
		fontFamily: theme.typography.fontFamily,
		fontSize: 'clamp(1.125rem, 1.75vw, 1.375rem)',
		fontWeight: 500,
		lineHeight: 1.5,
		marginBottom: 4,
	},
	role: { fontSize: 14 },
	highlights: {
		gridColumn: 2,
		margin: '4px 0 0',
		paddingLeft: 18,
		maxWidth: 880,
		'& li': { marginBottom: 8, paddingLeft: 4 },
		[theme.breakpoints.down('sm')]: { gridColumn: 1, marginTop: 8 },
	},
}));

export default function ExperienceItem({
	year,
	role,
	company,
	highlights,
	headingComponent = 'h2',
}: ExperienceRecord & { headingComponent?: 'h2' | 'h3' }) {
	const { classes } = useStyles();
	return (
		<article className={classes.item}>
			<p className={classes.year}>{year}</p>
			<div>
				<Typography className={classes.company} variant="h3" component={headingComponent}>
					{company}
				</Typography>
				<Typography className={classes.role} variant="body1">
					{role}
				</Typography>
			</div>
			{highlights.length > 0 && (
				<ul className={classes.highlights}>
					{highlights.map((highlight) => (
						<li key={highlight}>
							<Typography variant="body1">{highlight}</Typography>
						</li>
					))}
				</ul>
			)}
		</article>
	);
}
