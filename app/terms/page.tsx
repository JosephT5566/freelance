import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import { TermsContent } from '../../src/app/InfoPages';

export const metadata: Metadata = {
	title: "Terms of Service | Joseph's Projects",
	description:
		'Terms of Service for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
	alternates: {
		canonical: '/terms/',
	},
	openGraph: {
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng portfolio coastline' }],
		title: "Terms of Service | Joseph's Projects",
		description:
			'Terms of Service for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
		url: '/terms/',
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/cover.jpg'],
		title: "Terms of Service | Joseph's Projects",
		description:
			'Terms of Service for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
	},
};

export default function TermsPage() {
	return (
		<AppShell>
			<TermsContent />
		</AppShell>
	);
}
