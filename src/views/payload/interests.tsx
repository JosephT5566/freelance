import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import PopupAnimate from '../../components/shared/popupAnimate';
import Instagram from '../../../public/icons/instagram.svg';

const useStyle = makeStyles((theme) => ({
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
	const classes = useStyle();
	return (
		<article className={classes.interests}>
			<Typography variant="h1" className={classes.title}>
				{'Interests'}
			</Typography>
			<PopupAnimate>
				<div className={classes.description}>
					<Typography variant="body1">
						{`
							I like to take photos, just like the pictures in the album above.
							I like to create, just like a deep desire, it can bring me a sense of accomplishment.
							I like to diving. Yeah, I have AOW (advenced open water) licence, got it in Green Island.
							The ocean there is really beautiful, you should try if you haven't been there before.
							Besides that, I like travel, with camera absolutely, and snowboarding also.
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
