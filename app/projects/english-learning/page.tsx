import type { Metadata } from 'next';
import AppShell from '../../../src/app/AppShell';
import ProjectCaseStudy from '../../../src/app/ProjectCaseStudy';
import { englishLearningCaseStudy } from '../../../src/content/projects';

const description =
	'How Joseph Tseng evolved English Word Cards into a personal SvelteKit, FastAPI, and PostgreSQL project with owner-scoped, idempotent reviews.';

export const metadata: Metadata = {
	title: 'English Learning case study',
	description,
	alternates: { canonical: '/projects/english-learning/' },
	openGraph: {
		title: 'English Learning case study | Joseph Tseng',
		description,
		url: '/projects/english-learning/',
		type: 'website',
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng software engineering portfolio' }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'English Learning case study | Joseph Tseng',
		description,
		images: ['/cover.jpg'],
	},
};

export default function EnglishLearningPage() {
	return (
		<AppShell>
			<ProjectCaseStudy project={englishLearningCaseStudy} />
		</AppShell>
	);
}
