'use client';

import Project from '../views/payload/project';
import { HorizontalScroll_trans } from '../components/shared/horizontalScroll';

export default function Projects() {
	return (
		<HorizontalScroll_trans>
			<Project
				title="Megaport selector"
				image="https://i.imgur.com/MKtF24C.png"
				description={`
					A performance selector for Megaport Festival.
					There are lots of shows in the two days, so I design a website
					to make scheduling easier. And people may participate the party with only mobile device,
					so RWD is required.
				`}
				url="https://musicfest.josephtseng-tw.com"
				tools={['RWD web', 'React js', 'Gh-pages']}
			/>
			<Project title="Next" />
		</HorizontalScroll_trans>
	);
}
