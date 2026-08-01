import type { Metadata } from 'next';
import AppShell from '../../src/app/AppShell';
import { PrivacyContent } from '../../src/app/InfoPages';

export const metadata: Metadata = {
	title: "Privacy Policy | Joseph's Projects",
	description:
		'Privacy Policy for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
	alternates: {
		canonical: '/privacy',
	},
	openGraph: {
		title: "Privacy Policy | Joseph's Projects",
		description:
			'Privacy Policy for Joseph Tseng personal applications, including Travel Split and English Word Cards.',
		url: '/privacy',
	},
	twitter: {
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
