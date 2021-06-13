import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ViewPager from '../../components/shared/viewPager';

import { useFlickrGetPhotos } from '../../api/flickrHook';

const useStyle = makeStyles((theme) => ({
	album: {
		width: '100%',
	},
	title: {
		padding: '0 16.6%',
		marginBottom: '3em',
	},
	viewPager: {
		marginBottom: '3em',
		width: '100%',
		[theme.breakpoints.up('md')]: {
			height: '70vh',
		},
		[theme.breakpoints.down('md')]: {
			aspectRatio: '16 / 9',
		},
	},
}));

const defaultPages = [{ imageLink: '', content: '' }];

const developPages = [
	{ imageLink: 'https://live.staticflickr.com/65535/51211704659_3ee1b019d3_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210232917_e6690a39c7_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210947451_6d9d2dd79e_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211704489_7bd34af139_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211154738_1a9e7cdd18_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210947286_c742d30e3e_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211704289_4aa3df1753_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51210232562_bb3318f36c_o.jpg', content: '' },
	{ imageLink: 'https://live.staticflickr.com/65535/51211154508_400e4b17b6_o.jpg', content: '' },
];

export default function Album() {
	const classes = useStyle();
	const [pages, setPages] = useState(defaultPages);
	const { photos, error } = useFlickrGetPhotos({
		revalidateOnFocus: false,
		onSuccess: (data) => {
			setPages(data.photoset.photo.map((photo) => ({ imageLink: photo.url_o, content: '' })));
		},
	});

	if (!photos) {
		return null;
	}
	return (
		<div className={classes.album}>
			<div className={classes.title}>
				<Typography variant="h1">{'Album'}</Typography>
			</div>
			<div className={classes.viewPager}>
				<ViewPager pages={pages} />
			</div>
		</div>
	);
}
