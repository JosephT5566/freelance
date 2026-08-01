'use client';

import Project from '../views/payload/project';
import { HorizontalScroll_trans } from '../components/shared/horizontalScroll';

const currentYear = new Date().getFullYear();

export default function Projects() {
	return (
		<HorizontalScroll_trans>
			<Project
				title="Joseph's Projects"
				titleComponent="h1"
				eyebrow="Side Projects"
				placeholder="Projects"
				description="A collection of personal applications built by Joseph Tseng to solve everyday problems and explore better product experiences."
				sections={[
					{
						title: 'New Projects',
						paragraphs: [
							'Travel Split: A travel expense management app that helps groups record shared expenses and understand who owes whom.',
							'English Word Cards: A vocabulary learning app for collecting, reviewing, and practicing English words.',
						],
					},
				]}
				links={[
					{ label: 'Privacy', href: '/privacy' },
					{ label: 'Terms', href: '/terms' },
					{ label: 'Contact', href: '/' },
				]}
				footerNote={`© ${currentYear} Joseph Tseng`}
			/>
			<Project
				title="Megaport selector"
				image="https://i.imgur.com/MKtF24C.png"
				description={`
					A performance selector for Megaport Festival.
					There are lots of shows in the two days, so I design a website
					to make scheduling easier. And people may participate the party with only mobile device,
					so RWD is required.
				`}
				url="https://musicfest.josephtseng-tw.com"
				tools={['RWD web', 'React js', 'Gh-pages']}
			/>
			<Project
				title="Travel Split"
				eyebrow="OAuth Application"
				placeholder="Travel Split"
				description="Travel Split helps groups record shared travel expenses, calculate balances, and keep expense tracking clear throughout a trip."
				sections={[
					{
						title: 'Features',
						items: [
							'Record shared expenses',
							'Assign payer and participants',
							'Calculate balances',
							'Review trip expenses',
							'Google Sign-In authentication',
						],
					},
					{
						title: 'Google data usage',
						paragraphs: [
							'Travel Split uses Google Sign-In to authenticate users and associate expense data with their accounts.',
							'The application may receive basic account information including name, email address, profile image, and Google account identifier.',
							"Travel Split does not access Gmail, Google Drive, Google Calendar, contacts, or the user's Google password.",
						],
					},
					{
						title: 'Data notes',
						items: [
							'User-generated expense data',
							'Authentication only for identity',
							'No data selling',
							'Links to Privacy / Terms',
						],
					},
				]}
				links={[
					{ label: 'Privacy', href: '/privacy' },
					{ label: 'Terms', href: '/terms' },
				]}
			/>
			<Project
				title="English Word Cards"
				eyebrow="OAuth Application"
				placeholder="Word Cards"
				description="English Word Cards helps users collect unfamiliar English words and review them through a simple vocabulary learning workflow."
				sections={[
					{
						title: 'Features',
						items: [
							'Save vocabulary',
							'Add notes / definitions',
							'Review words',
							'Organize learning list',
							'Google Sign-In authentication',
						],
					},
					{
						title: 'Google data usage',
						paragraphs: [
							'English Word Cards uses Google Sign-In to authenticate users and associate saved vocabulary with their accounts.',
							'The application may receive basic account information including name, email address, profile image, and Google account identifier.',
							"It does not access Gmail, Google Drive, Google Calendar, contacts, or the user's Google password.",
						],
					},
					{
						title: 'Data notes',
						items: [
							'User-generated vocabulary',
							'Identity-based authentication',
							'No data selling',
							'Privacy / Terms links',
						],
					},
				]}
				links={[
					{ label: 'Privacy', href: '/privacy' },
					{ label: 'Terms', href: '/terms' },
				]}
			/>
			<Project
				title="Google Sign-In"
				eyebrow="Account Access"
				placeholder="Google"
				description="Some applications support signing in with Google. Google Sign-In is used only to authenticate users and identify their accounts."
				sections={[
					{
						title: 'Requested data',
						paragraphs: [
							'These applications request only basic profile information such as name, email address, profile image, and Google account identifier.',
							'They do not access Gmail, Google Drive, Google Calendar, contacts, or other Google services unless explicitly stated by the individual application.',
						],
					},
				]}
				links={[
					{ label: 'Privacy', href: '/privacy' },
					{ label: 'Terms', href: '/terms' },
					{ label: 'Contact', href: '/' },
				]}
			/>
		</HorizontalScroll_trans>
	);
}
