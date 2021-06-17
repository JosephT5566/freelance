import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Project from '../src/views/payload/project';

const useStyle = makeStyles((theme) => ({
	projects: {
		width: '100%',
		backgroundColor: theme.palette.background.default,
	},
}));

export default function Projects() {
	const classes = useStyle();

	return (
		<div className={classes.projects}>
			<Project
				title={'Megaport selector'}
				image={'https://live.staticflickr.com/65535/51049862331_067e9dcec9_b.jpg'}
				description={
					'Nunc accumsan ipsum vitae ex lacinia varius. Donec condimentum sodales odio eu accumsan. Sed quis velit condimentum, vehicula ex sit amet, rutrum mi'
				}
				url={''}
				tools={['1', '2']}
			/>
			<Project
				title={'Megaport selector'}
				image={'https://live.staticflickr.com/65535/51049860506_291e6c2cf3_b.jpg'}
				description={
					'Nunc accumsan ipsum vitae ex lacinia varius. Donec condimentum sodales odio eu accumsan. Sed quis velit condimentum, vehicula ex sit amet, rutrum mi'
				}
				url={''}
				tools={['1', '2']}
			/>
		</div>
	);
}
