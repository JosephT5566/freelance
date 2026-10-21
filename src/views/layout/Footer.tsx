import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { FaBehance, FaFlickr, FaGithub, FaLinkedin } from 'react-icons/fa';

import Container from '@mui/material/Container';
import { CONTACT_EMAIL, FLICKR_URL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../../utils/static';
import Typography from '@mui/material/Typography';

const useStyle = makeStyles()((theme) => ({
	footer: {
		width: '100%',
		minHeight: '15rem',
		padding: '2rem 1.5rem 3rem',
		gap: '0.75rem',
		textAlign: 'center',
		backgroundColor: theme.palette.background.default,
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	description: {
		padding: '0 16.6%',
	},
	icons: {
		display: 'flex',
	},
	icon: {
		transition: '0.5s',
		width: '2rem',
		color: theme.palette.secondary.main,
		margin: '0 5px',
		'&:hover': {
			cursor: 'pointer',
			color: theme.palette.secondary.dark,
		},
	},
	copyright: {
		position: 'absolute',
		bottom: '0',
		display: 'flex',
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		},
		color: theme.palette.primary.light,
	},
}));

export default function Footer() {
	const { classes } = useStyle();
	const currentYear = new Date().getFullYear();

	return (
		<footer className={classes.footer}>
			<Typography variant="h2" component="h2" id="contact">
				Get in touch
			</Typography>
			<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
			<a href={RESUME_URL} download>
				Download resume (PDF)
			</a>
			<div className={classes.icons}>
				<a href="https://www.behance.net/zxp9301107b6a" target="_blank" rel="noopener noreferrer">
					<FaBehance className={classes.icon} aria-label="Behance" />
				</a>
				<a href={FLICKR_URL} aria-label="Flickr" target="_blank" rel="noopener noreferrer">
					<FaFlickr className={classes.icon} aria-label="Flickr" />
				</a>
				<a href={GITHUB_URL} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
					<FaGithub className={classes.icon} aria-label="GitHub" />
				</a>
				<a href={LINKEDIN_URL} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
					<FaLinkedin className={classes.icon} aria-label="LinkedIn" />
				</a>
			</div>
			<Container className={classes.copyright}>
				<div>{`© ${currentYear} Joseph Tseng`}</div>
			</Container>
		</footer>
	);
}
