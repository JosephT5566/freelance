import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import { PrivacyContent } from '../../src/app/InfoPages';

export const metadata: Metadata = {
	title: "Privacy Policy | Joseph's Projects",
	description:
		'Privacy Policy for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
	alternates: {
		canonical: '/privacy/',
	},
	openGraph: {
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng portfolio coastline' }],
		title: "Privacy Policy | Joseph's Projects",
		description:
			'Privacy Policy for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
		url: '/privacy/',
	},
	twitter: {
		card: 'summary_large_image',
		images: ['/cover.jpg'],
		title: "Privacy Policy | Joseph's Projects",
		description:
			'Privacy Policy for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
	},
};

export default function PrivacyPage() {
	return (
		<AppShell>
			<PrivacyContent />
		</AppShell>
	);
}
