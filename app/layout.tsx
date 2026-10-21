import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Providers from './providers';
import '../styles/globals.css';
import { APP_NAME, SITE_DESCRIPTION, SITE_URL, GITHUB_URL, LINKEDIN_URL } from '../src/utils/static';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: APP_NAME,
		template: `%s | ${APP_NAME}`,
	},
	description: SITE_DESCRIPTION,
	keywords: [
		'Joseph Tseng',
		'software engineer',
		'frontend engineer',
		'React',
		'TypeScript',
		'Next.js',
		'SvelteKit',
		'GraphQL',
		'product engineer',
	],
	authors: [{ name: 'Joseph Tseng' }],
	robots: 'index, follow',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: APP_NAME,
		description: SITE_DESCRIPTION,
		type: 'website',
		url: '/',
		siteName: 'Joseph Tseng',
		images: [
			{
				url: '/cover.jpg',
				alt: 'Joseph Tseng software engineering portfolio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: APP_NAME,
		description: SITE_DESCRIPTION,
		images: ['/cover.jpg'],
	},
	icons: {
		icon: '/favicon.png',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#000000',
};

const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Joseph Tseng',
	url: `${SITE_URL}/`,
	jobTitle: 'Software Engineer',
	sameAs: [GITHUB_URL, LINKEDIN_URL],
	knowsAbout: [
		'React',
		'TypeScript',
		'Next.js',
		'SvelteKit',
		'GraphQL',
		'Frontend architecture',
		'Product development',
		'Software quality',
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat&family=Noto+Sans+TC&family=Playfair+Display&family=Roboto:wght@300;400;500;700&family=Vidaloka&display=swap"
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
				<Script
					id="person-json-ld"
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
			</body>
		</html>
	);
}
