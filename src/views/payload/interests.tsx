import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

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
}));

export default function Interests() {
	const classes = useStyle();
	return (
		<div className={classes.interests}>
			<Typography variant="h1" className={classes.title}>
				{'Interests'}
			</Typography>
			<div className={classes.description}>
				<Typography variant="body1">
					{
						'Donec ac lorem mauris. Suspendisse nisl arcu, porttitor vel felis vitae, fermentum faucibus arcu. Sed et interdum odio. Duis cursus nec enim eu fermentum. Praesent aliquet nisi sodales, maximus ligula ut, pharetra nunc. Cras tincidunt ligula et ipsum dictum ullamcorper. Aliquam lectus diam, posuere quis nisl non, efficitur tincidunt dolor. Duis finibus egestas felis non ultrices. Nulla facilisi.'
					}
				</Typography>
			</div>
		</div>
	);
}
