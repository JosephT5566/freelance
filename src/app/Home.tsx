'use client';

import Cover from '../views/payload/cover';
import AboutMe from '../views/payload/aboutMe';
import Experiences from '../views/payload/experiences';
import FeaturedProjects from '../views/payload/featuredProjects';
import Interests from '../views/payload/interests';
import Footer from '../views/layout/Footer';

export default function Home() {
	return (
		<>
			<main>
				<Cover />
				<AboutMe />
				<FeaturedProjects />
				<Experiences />
				<Interests />
			</main>
			<Footer />
		</>
	);
}
