import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import Project from '../src/views/payload/project';

const useStyle = makeStyles((theme) => ({
	projectPage: {
		position: 'fixed',
		left: '0',
		top: '0',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
	},
	projects: {
		position: 'absolute',
		top: '0',
		left: '0',
		display: 'flex',
		minWidth: '100%',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.default,
		willChange: 'transform',
	},
}));

export default function Projects() {
	const classes = useStyle();
	const [transX, setTransX] = useState(0);
	const projsContRef = useRef(null);

	const handleWheel = (event) => {
		const maxTransX = projsContRef.current.clientWidth - window.innerWidth;

		event.deltaX && setTransX((prev) => _.clamp(prev - event.deltaX, -maxTransX, 0));
		event.deltaY && setTransX((prev) => _.clamp(prev - event.deltaY, -maxTransX, 0));
	};

	useEffect(() => {
		// Disable web page navigation on swipe(back and forward)
		document.body.style.overscrollBehaviorX = 'none';
	}, []);

	useEffect(() => {
		window.addEventListener('wheel', handleWheel);

		return () => window.removeEventListener('wheel', handleWheel);
	}, [handleWheel]);

	return (
		<div className={classes.projectPage}>
			<div className={classes.projects} ref={projsContRef} style={{ transform: `translateX(${transX}px)` }}>
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
				<Project title={'Next'} />
			</div>
		</div>
	);
}
