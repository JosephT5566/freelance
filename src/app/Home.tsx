'use client';

import Cover from '../views/payload/cover';
import AboutMe from '../views/payload/aboutMe';
import Experiences from '../views/payload/experiences';
import Album from '../views/payload/album';
import Interests from '../views/payload/interests';
import Footer from '../views/layout/Footer';

export default function Home() {
	return (
		<>
			<Cover />
			<AboutMe />
			<Experiences />
			<Interests />
			<Album />
			<Footer />
		</>
	);
}
