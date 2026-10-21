import type { Metadata } from 'next';
import { SITE_DESCRIPTION } from '../src/utils/static';
import AppShell from '../src/app/AppShell';
import Home from '../src/app/Home';

export const metadata: Metadata = {
	description: SITE_DESCRIPTION,
	alternates: { canonical: '/' },
	openGraph: {
		title: 'Joseph Tseng | Software Engineer',
		description: SITE_DESCRIPTION,
		url: '/',
		type: 'website',
		images: [{ url: '/cover.jpg', alt: 'Joseph Tseng software engineering portfolio' }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Joseph Tseng | Software Engineer',
		description: SITE_DESCRIPTION,
		images: ['/cover.jpg'],
	},
};

export default function Page() {
	return (
		<AppShell>
			<Home />
		</AppShell>
	);
}
