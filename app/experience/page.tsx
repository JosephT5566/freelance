import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import Experience from '../../src/app/Experience';

const description =
	"Joseph Tseng's engineering experience at Houzz, earlier frontend and firmware roles, skills, and delivery highlights.";

export const metadata: Metadata = {
	title: 'Experience',
	description,
	alternates: { canonical: '/experience/' },
	openGraph: {
		title: 'Experience | Joseph Tseng',
		description,
		url: '/experience/',
		type: 'website',
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng software engineering portfolio' }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Experience | Joseph Tseng',
		description,
		images: ['/cover.jpg'],
	},
};

export default function ExperiencePage() {
	return (
		<AppShell>
			<Experience />
		</AppShell>
	);
}
