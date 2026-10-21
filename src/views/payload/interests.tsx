import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { FLICKR_URL, INSTAGRAM_URL } from '../../utils/static';

const useStyles = makeStyles()((theme) => ({
	section: { padding: '3rem 16.6% 4rem', [theme.breakpoints.down('md')]: { padding: '3rem 2rem' } },
	copy: { maxWidth: '46rem', marginTop: '1.5rem' },
	links: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '1.5rem',
		marginTop: '1.5rem',
		'& a': { textDecoration: 'underline', textUnderlineOffset: '0.2em', padding: '0.5rem 0' },
	},
}));

export default function Interests() {
	const { classes } = useStyles();
	return (
		<section className={classes.section} aria-labelledby="interests-title">
			<Typography variant="h1" component="h2" id="interests-title">
				Beyond the Code
			</Typography>
			<Typography variant="body1" className={classes.copy}>
				Photography and travel take me away from the screen. I also enjoy snowboarding and scuba diving, and
				hold an Advanced Open Water certification.
			</Typography>
			<div className={classes.links}>
				<a href={FLICKR_URL} target="_blank" rel="noopener noreferrer">
					Photography on Flickr
				</a>
				<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
					Instagram
				</a>
			</div>
		</section>
	);
}
