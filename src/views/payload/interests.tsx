import React from 'react';
import { makeStyles } from 'tss-react/mui';

import Typography from '@mui/material/Typography';
import PopupAnimate from '../../components/shared/popupAnimate';
import Instagram from '../../assets/icons/instagram.svg?react';

const useStyle = makeStyles()((theme) => ({
	interests: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		padding: '1em 0',
	},
	description: {
		padding: '0 16.6%',
	},
	icon: {
		width: '1rem',
		transition: '0.5s',
		'&:hover': {
			cursor: 'pointer',
			color: theme.palette.secondary.main,
		},
	},
}));

export default function Interests() {
	const { classes } = useStyle();
	return (
		<article className={classes.interests}>
			<Typography variant="h1" className={classes.title}>
				{'Beyond Engineering'}
			</Typography>
			<PopupAnimate>
				<div className={classes.description}>
					<Typography variant="body1">
						{`
							Outside product development, I build practical side projects with SvelteKit,
							TypeScript, Supabase, Google Apps Script, and AI-assisted workflows. I also enjoy
							photography, travel, snowboarding, and scuba diving, and hold an Advanced Open
							Water certification.
						`}
					</Typography>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="body1">{`Check out my`}</Typography>
						<a
							href="https://www.instagram.com/tsengchun34/"
							style={{ padding: '0 4px' }}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Instagram className={classes.icon} />
						</a>
					</div>
				</div>
			</PopupAnimate>
		</article>
	);
}
