import type { Metadata } from 'next';
import Script from 'next/script';
import AppShell from '../../../src/app/AppShell';
import JosephOAuth from '../../../src/app/JosephOAuth';
import { SITE_URL } from '../../../src/utils/static';

export const metadata: Metadata = {
	title: 'Joseph OAuth',
	description:
		'Joseph OAuth is the Google Sign-In and secure session service for applications operated by Joseph Tseng.',
	alternates: {
		canonical: '/projects/joseph-oauth',
	},
	openGraph: {
		title: 'Joseph OAuth | Joseph Tseng',
		description:
			'Google Sign-In, data-use details, security practices, and the applications supported by Joseph OAuth.',
		url: '/projects/joseph-oauth',
		type: 'website',
	},
	twitter: {
		title: 'Joseph OAuth | Joseph Tseng',
		description:
			'Google Sign-In, data-use details, security practices, and the applications supported by Joseph OAuth.',
	},
};

const softwareApplicationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'Joseph OAuth',
	url: `${SITE_URL}/projects/joseph-oauth`,
	applicationCategory: 'SecurityApplication',
	operatingSystem: 'Web',
	description:
		'An authentication and secure session service operated by Joseph Tseng for supported web applications.',
	author: {
		'@type': 'Person',
		name: 'Joseph Tseng',
	},
};

export default function JosephOAuthPage() {
	return (
		<AppShell>
			<JosephOAuth />
			<Script
				id="joseph-oauth-json-ld"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
			/>
		</AppShell>
	);
}
