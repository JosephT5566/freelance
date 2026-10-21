'use client';

import Experiences from '../views/payload/experiences';
import Footer from '../views/layout/Footer';

export default function Experience() {
	return (
		<>
			<main style={{ paddingTop: '5rem' }}>
				<Experiences full />
			</main>
			<Footer />
		</>
	);
}
