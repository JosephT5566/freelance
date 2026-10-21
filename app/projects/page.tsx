import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import Projects from '../../src/app/Projects';

export const metadata: Metadata = {
	title: "Joseph's Projects",
	description:
		'Personal applications by Joseph Tseng, including English Learning, JoPie, and Travel Split, with engineering case studies and source links.',
	alternates: {
		canonical: '/projects/',
	},
	openGraph: {
		title: "Joseph's Projects | Joseph Tseng",
		description:
			'Personal applications by Joseph Tseng, including English Learning, JoPie, and Travel Split, with engineering case studies and source links.',
		url: '/projects/',
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng personal projects' }],
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/cover.jpg'],
		title: "Joseph's Projects | Joseph Tseng",
		description:
			'Personal applications by Joseph Tseng, including English Learning, JoPie, and Travel Split, with engineering case studies and source links.',
	},
};

export default function ProjectsPage() {
	return (
		<AppShell>
			<Projects />
		</AppShell>
	);
}
