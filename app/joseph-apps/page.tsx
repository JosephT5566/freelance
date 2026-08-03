import type { Metadata } from 'next';
import Script from 'next/script';
import AppShell from '../../src/app/AppShell';
import JosephApps from '../../src/app/JosephApps';
import { SITE_URL } from '../../src/utils/static';

export const metadata: Metadata = {
	title: 'Joseph Apps',
	description:
		'Joseph Apps provides Google Sign-In and secure sessions for applications operated by Joseph Tseng.',
	alternates: {
		canonical: '/joseph-apps',
	},
	openGraph: {
		title: 'Joseph Apps | Joseph Tseng',
		description:
			'Google Sign-In, data-use details, security practices, and the applications supported by Joseph Apps.',
		url: '/joseph-apps',
		type: 'website',
	},
	twitter: {
		title: 'Joseph Apps | Joseph Tseng',
		description:
			'Google Sign-In, data-use details, security practices, and the applications supported by Joseph Apps.',
	},
};

const softwareApplicationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'Joseph Apps',
	url: `${SITE_URL}/joseph-apps`,
	applicationCategory: 'SecurityApplication',
	operatingSystem: 'Web',
	description:
		'A collection of applications operated by Joseph Tseng that share Google Sign-In and secure session services.',
	author: {
		'@type': 'Person',
		name: 'Joseph Tseng',
	},
};

export default function JosephAppsPage() {
	return (
		<AppShell>
			<JosephApps />
			<Script
				id="joseph-apps-json-ld"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
			/>
		</AppShell>
	);
}
