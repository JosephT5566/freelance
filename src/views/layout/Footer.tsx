import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
		width: '2rem',
		color: theme.palette.secondary.main,
		margin: '0 5px',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	copyright: {
		position: 'absolute',
		right: '16%',
		bottom: '1em',
		color: theme.palette.primary.light,
	},
}));

export default function Footer() {
	const classes = useStyle();

	return (
		<div className={classes.footer}>
			<Typography variant="body1">{'Elsewhere on the Internet'}</Typography>
			<div className={classes.icons}>
				<Behance className={classes.icon} />
				<Flickr className={classes.icon} />
				<Github className={classes.icon} />
				<Instagram className={classes.icon} />
				<Linkedin className={classes.icon} />
			</div>
			<div className={classes.copyright}>{'© Design by Joseph'}</div>
		</div>
	);
}
