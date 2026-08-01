import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import Projects from '../../src/app/Projects';

export const metadata: Metadata = {
	title: "Joseph's Projects",
	description:
		'A collection of personal applications built by Joseph Tseng to solve everyday problems and explore better product experiences.',
	alternates: {
		canonical: '/projects',
	},
	openGraph: {
		title: "Joseph's Projects | Joseph Tseng",
		description:
			'A collection of personal applications built by Joseph Tseng to solve everyday problems and explore better product experiences.',
		url: '/projects',
	},
	twitter: {
		title: "Joseph's Projects | Joseph Tseng",
		description:
			'A collection of personal applications built by Joseph Tseng to solve everyday problems and explore better product experiences.',
	},
};

export default function ProjectsPage() {
	return (
		<AppShell>
			<Projects />
		</AppShell>
	);
}
