import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import { LegalContent } from '../../src/app/InfoPages';

export const metadata: Metadata = {
	title: "Legal | Joseph's Projects",
	description: 'Privacy Policy and Terms of Service for Joseph Tseng personal applications.',
	alternates: {
		canonical: '/legal/',
	},
	openGraph: {
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng portfolio coastline' }],
		title: "Legal | Joseph's Projects",
		description: 'Privacy Policy and Terms of Service for Joseph Tseng personal applications.',
		url: '/legal/',
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/cover.jpg'],
		title: "Legal | Joseph's Projects",
		description: 'Privacy Policy and Terms of Service for Joseph Tseng personal applications.',
	},
};

export default function LegalPage() {
	return (
		<AppShell>
			<LegalContent />
		</AppShell>
	);
}
