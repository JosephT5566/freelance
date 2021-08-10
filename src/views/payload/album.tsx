import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ViewPager from '../../components/shared/viewPager';
import Loading from '../../views/layout/Loading';
import ErrorPage from '../../views/layout/Error';

import { useFlickrGetPhotos } from '../../api/flickrHook';
import Carousel from '../../components/shared/Carousel';

const useStyle = makeStyles((theme) => ({
	album: {
		width: '100%',
		marginBottom: '3em',
	},
	title: {
		padding: '1em 16.6%',
		[theme.breakpoints.down('sm')]: {
			padding: '1em 0',
		},
	},
	outerWrapper: {
		width: '100%',
		position: 'relative',
		[theme.breakpoints.up('md')]: {
			height: '45rem',
		},
		[theme.breakpoints.down('sm')]: {
			paddingTop: '56.25%',
		},
	},
	wrapper: {
		width: '100%',
		height: '100%',
		[theme.breakpoints.down('sm')]: {
			position: 'absolute',
			top: '0',
		},
	},
}));

const defaultPages = [{ imageLink: '' }];

const developPages = [
	{ imageLink: 'https://live.staticflickr.com/65535/51211704659_3ee1b019d3_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210232917_e6690a39c7_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210947451_6d9d2dd79e_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211704489_7bd34af139_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211154738_1a9e7cdd18_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210947286_c742d30e3e_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211704289_4aa3df1753_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210232562_bb3318f36c_o.jpg' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211154508_400e4b17b6_o.jpg' },
];

export default function Album() {
	const classes = useStyle();
	const { photos, error } = useFlickrGetPhotos({
		revalidateOnFocus: false,
	});

	return (
		<div className={classes.album}>
			<div className={classes.title}>
				<Typography variant="h1">{'Album'}</Typography>
			</div>
			<div className={classes.outerWrapper}>
				{photos ? (
					<div className={classes.wrapper}>
						<Carousel images={photos.photoset.photo.map((photo) => ({ imageLink: photo.url_o }))} />
					</div>
				) : (
					<Loading />
				)}
				{error && <ErrorPage err={error} />}
			</div>
		</div>
	);
}
