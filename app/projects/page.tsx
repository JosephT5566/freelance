import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import Projects from '../../src/app/Projects';

export const metadata: Metadata = {
	title: 'Projects',
	description:
		'Selected web projects by Joseph Tseng, a software engineer specializing in modern frontend product development.',
	alternates: {
		canonical: '/projects/',
	},
	openGraph: {
		title: 'Projects | Joseph Tseng | Software Engineer',
		description:
			'Selected web projects by Joseph Tseng, a software engineer specializing in modern frontend product development.',
		url: '/projects/',
	},
	twitter: {
		title: 'Projects | Joseph Tseng | Software Engineer',
		description:
			'Selected web projects by Joseph Tseng, a software engineer specializing in modern frontend product development.',
	},
};

export default function ProjectsPage() {
	return (
		<AppShell>
			<Projects />
		</AppShell>
	);
}
