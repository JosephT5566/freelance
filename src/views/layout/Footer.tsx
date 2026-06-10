import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Behance from '../../assets/icons/behance.svg?react';
import Flickr from '../../assets/icons/flickr.svg?react';
import Github from '../../assets/icons/github.svg?react';
import Instagram from '../../assets/icons/instagram.svg?react';
import Linkedin from '../../assets/icons/linkedin.svg?react';

const useStyle = makeStyles()((theme) => ({
	footer: {
		width: '100%',
		height: '10rem',
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

	return (
		<footer className={classes.footer}>
			<Typography variant="body1">{'Elsewhere on the Internet'}</Typography>
			<div className={classes.icons}>
				<a href="https://www.behance.net/zxp9301107b6a" target="_blank" rel="noopener noreferrer">
					<Behance className={classes.icon} />
				</a>
				<a href="https://www.flickr.com/photos/joseph-t_0304/" target="_blank" rel="noopener noreferrer">
					<Flickr className={classes.icon} />
				</a>
				<a href="https://github.com/JosephT5566" target="_blank" rel="noopener noreferrer">
					<Github className={classes.icon} />
				</a>
				{/* <a href="https://www.instagram.com/tsengchun34/" target="_blank" rel="noopener noreferrer">
					<Instagram className={classes.icon} />
				</a> */}
				<a href="https://www.linkedin.com/in/joseph-tseng-50ba36136" target="_blank" rel="noopener noreferrer">
					<Linkedin className={classes.icon} />
				</a>
			</div>
			<Container className={classes.copyright}>
				<div>{`© Design by Joseph v${__APP_VERSION__}`}</div>
			</Container>
		</footer>
	);
}
