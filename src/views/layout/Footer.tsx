import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Behance from '../../../public/icons/behance.svg';
import Flickr from '../../../public/icons/flickr.svg';
import Github from '../../../public/icons/github.svg';
import Instagram from '../../../public/icons/instagram.svg';
import Linkedin from '../../../public/icons/linkedin.svg';

const useStyle = makeStyles((theme) => ({
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
	const classes = useStyle();

	return (
		<div className={classes.footer}>
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
				<div>{`© Design by Joseph v${process.env.NEXT_PUBLIC_VERSION}`}</div>
			</Container>
		</div>
	);
}
