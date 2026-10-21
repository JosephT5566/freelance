'use client';

import { useRef } from 'react';
import { makeStyles } from 'tss-react/mui';
import Cover from '../views/payload/cover';
import HeroContours from '../views/payload/heroContours';
import Experiences from '../views/payload/experiences';
import FeaturedProjects from '../views/payload/featuredProjects';
import Interests from '../views/payload/interests';

const useStyles = makeStyles()({
	main: { position: 'relative', isolation: 'isolate' },
	foreground: { position: 'relative', zIndex: 1 },
});

export default function Home() {
	const { classes } = useStyles();
	const heroRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	return (
		<main className={classes.main}>
			<HeroContours heroRef={heroRef} imageRef={imageRef} />
			<div className={classes.foreground}>
				<Cover heroRef={heroRef} imageRef={imageRef} />
				<FeaturedProjects />
				<Experiences />
				<Interests />
			</div>
		</main>
	);
}
