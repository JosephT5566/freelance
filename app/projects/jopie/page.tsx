import type { Metadata } from 'next';
import AppShell from '../../../src/app/AppShell';
import ProjectCaseStudy from '../../../src/app/ProjectCaseStudy';
import { jopieCaseStudy } from '../../../src/content/projects';

const description =
	"Joseph Tseng's personal household expense project, covering SvelteKit, Supabase, AI-assisted entry, validation, and recovery decisions.";

export const metadata: Metadata = {
	title: 'JoPie case study',
	description,
	alternates: { canonical: '/projects/jopie/' },
	openGraph: {
		title: 'JoPie case study | Joseph Tseng',
		description,
		url: '/projects/jopie/',
		type: 'website',
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng software engineering portfolio' }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'JoPie case study | Joseph Tseng',
		description,
		images: ['/cover.jpg'],
	},
};

export default function JoPiePage() {
	return (
		<AppShell>
			<ProjectCaseStudy project={jopieCaseStudy} />
		</AppShell>
	);
}
