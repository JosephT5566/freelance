import { makeStyles } from 'tss-react/mui';
import { FaFlickr, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_EMAIL, FLICKR_URL, GITHUB_URL, LINKEDIN_URL } from '../../utils/static';

const useStyles = makeStyles()(() => ({
	footer: { borderTop: '1px solid rgba(37,66,81,.22)', padding: '24px 0 32px' },
	row: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '12px 32px',
	},
	copyright: { fontSize: 12, margin: 0 },
	icons: { display: 'flex', gap: 4, '& svg': { width: 19, height: 19 } },
	legal: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 24,
		'& a': {
			display: 'inline-flex',
			alignItems: 'center',
			minHeight: 44,
			fontSize: 12,
			'&:hover': { textDecoration: 'underline' },
		},
	},
}));

export default function Footer() {
	const { classes } = useStyles();
	return (
		<footer className={`site-container ${classes.footer}`}>
			<div className={classes.row}>
				<p className={classes.copyright}>© {new Date().getFullYear()} Joseph Tseng</p>
				<div className={classes.icons}>
					<a className="icon-link" href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Joseph Tseng">
						<Mail aria-hidden="true" />
					</a>
					<a
						className="icon-link"
						href={GITHUB_URL}
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub aria-hidden="true" />
					</a>
					<a
						className="icon-link"
						href={LINKEDIN_URL}
						aria-label="LinkedIn"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin aria-hidden="true" />
					</a>
					<a
						className="icon-link"
						href={FLICKR_URL}
						aria-label="Flickr"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaFlickr aria-hidden="true" />
					</a>
				</div>
				<nav className={classes.legal} aria-label="Legal">
					<Link href="/legal/">Legal</Link>
					<Link href="/privacy/">Privacy</Link>
					<Link href="/terms/">Terms</Link>
				</nav>
			</div>
		</footer>
	);
}
