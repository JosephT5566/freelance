'use client';

import Cover from '../views/payload/cover';
import Experiences from '../views/payload/experiences';
import FeaturedProjects from '../views/payload/featuredProjects';
import Interests from '../views/payload/interests';

export default function Home() {
	return (
		<>
			<main>
				<Cover />
				<FeaturedProjects />
				<Experiences />
				<Interests />
			</main>
		</>
	);
}
