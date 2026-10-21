import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { FaFlickr, FaInstagram } from 'react-icons/fa';
import { FLICKR_URL, INSTAGRAM_URL } from '../../utils/static';

const useStyles = makeStyles()((theme) => ({
	section: {
		display: 'grid',
		gridTemplateColumns: '180px 1fr',
		gap: '12px 48px',
		paddingBlock: '56px 72px',
		borderTop: '1px solid rgba(37,66,81,.25)',
		alignItems: 'start',
		[theme.breakpoints.down('sm')]: { gridTemplateColumns: '96px 1fr', gap: '24px 20px', paddingBlock: 48 },
	},
	portrait: {
		width: 180,
		height: 200,
		gridRow: '1 / span 2',
		objectFit: 'cover',
		objectPosition: 'center 35%',
		[theme.breakpoints.down('sm')]: { width: 96, height: 120, gridRow: '1' },
	},
	copy: { maxWidth: 700, '& h2': { marginBottom: 16 }, '& p': { margin: 0 } },
	details: { maxWidth: 700, gridColumn: 2, [theme.breakpoints.down('sm')]: { gridColumn: '1 / -1' } },
	links: { display: 'flex', gap: 8, marginTop: 16, marginLeft: -10, '& svg': { width: 21, height: 21 } },
}));

export default function Interests() {
	const { classes } = useStyles();
	return (
		<section className={`site-container ${classes.section}`} id="beyond" aria-labelledby="interests-title">
			<img
				className={classes.portrait}
				src="/images/profile.jpg"
				alt="Joseph Tseng"
				width={180}
				height={200}
				loading="lazy"
			/>
			<div className={classes.copy}>
				<p className="section-kicker" style={{ marginBottom: 12 }}>
					Away from the screen
				</p>
				<Typography variant="h2" component="h2" id="interests-title">
					Beyond the code.
				</Typography>
			</div>
			<div className={classes.details}>
				<Typography variant="body1">
					Photography and travel take me away from the screen. I also enjoy snowboarding and scuba diving, and
					hold an Advanced Open Water certification.
				</Typography>
				<div className={classes.links}>
					<a
						className="icon-link"
						href={FLICKR_URL}
						aria-label="Photography on Flickr"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaFlickr aria-hidden="true" />
					</a>
					<a
						className="icon-link"
						href={INSTAGRAM_URL}
						aria-label="Instagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaInstagram aria-hidden="true" />
					</a>
				</div>
			</div>
		</section>
	);
}
