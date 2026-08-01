'use client';

import { MouseEvent, useEffect, useMemo, useState } from 'react';
import type { ComponentProps } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import Project from '../views/payload/project';

const useStyle = makeStyles()((theme) => ({
	projectsPage: {
		position: 'relative',
		width: '100%',
		overflowX: 'hidden',
	},
	content: {
		width: '100%',
		[theme.breakpoints.up('md')]: {
			paddingLeft: '10rem',
		},
	},
	titleSection: {
		width: '100%',
		padding: '6rem',
		scrollMarginTop: '5rem',
		[theme.breakpoints.down('md')]: {
			padding: '2rem 0.5rem 1rem',
			scrollMarginTop: '8rem',
		},
	},
	title: {
		marginBottom: '0.5rem',
	},
	description: {
		maxWidth: '42rem',
	},
	sectionNav: {
		[theme.breakpoints.up('md')]: {
			position: 'fixed',
			top: '50%',
			left: '1.5rem',
			width: '8.5rem',
			transform: 'translateY(-50%)',
			zIndex: theme.zIndex.speedDial - 2,
		},
		[theme.breakpoints.down('md')]: {
			position: 'sticky',
			top: 0,
			zIndex: theme.zIndex.appBar,
			width: '100%',
			padding: '0.75rem 0.5rem',
			backgroundColor: theme.palette.background.default,
			borderTop: `1px solid ${theme.palette.primary.light}`,
			borderBottom: `1px solid ${theme.palette.primary.light}`,
		},
	},
	sectionNavList: {
		display: 'flex',
		gap: '0.4rem',
		margin: 0,
		padding: 0,
		listStyle: 'none',
		[theme.breakpoints.up('md')]: {
			flexDirection: 'column',
		},
		[theme.breakpoints.down('md')]: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(8.25rem, 1fr))',
			alignItems: 'stretch',
		},
	},
	sectionNavLink: {
		display: 'grid',
		gridTemplateColumns: '0.65rem minmax(0, 1fr)',
		alignItems: 'center',
		gap: '0.45rem',
		minHeight: '2.25rem',
		padding: '0.35rem 0.45rem',
		borderRadius: '0.5rem',
		color: theme.palette.primary.main,
		fontSize: '0.78rem',
		fontWeight: 700,
		lineHeight: 1.2,
		transition: 'color 0.2s, background-color 0.2s',
		'&::before': {
			content: '""',
			width: '0.45rem',
			height: '0.45rem',
			borderRadius: '50%',
			border: `1px solid ${theme.palette.primary.light}`,
			backgroundColor: 'transparent',
			transition: 'background-color 0.2s, border-color 0.2s',
		},
		'&:hover, &:focus': {
			color: theme.palette.secondary.main,
			backgroundColor: 'rgba(255, 255, 255, 0.36)',
			outline: 'none',
		},
		'&.active': {
			color: theme.palette.secondary.main,
			backgroundColor: 'rgba(255, 255, 255, 0.5)',
		},
		'&.active::before': {
			borderColor: theme.palette.secondary.main,
			backgroundColor: theme.palette.secondary.main,
		},
		[theme.breakpoints.down('md')]: {
			gridTemplateColumns: '0.55rem minmax(0, 1fr)',
			minHeight: '2rem',
			padding: '0.3rem 0.4rem',
			fontSize: '0.72rem',
		},
	},
}));

function TitleSection() {
	const { classes } = useStyle();

	return (
		<section className={classes.titleSection} id="projects-intro" aria-labelledby="projects-title">
			<Typography className={classes.title} id="projects-title" variant="h1" component="h1">
				Joseph&apos;s Projects
			</Typography>
			<Typography className={classes.description} variant="body1">
				A collection of personal applications built by Joseph Tseng to solve everyday problems and explore better product
				experiences.
			</Typography>
		</section>
	);
}

const projectItems = [
	{
		id: 'megaport-selector',
		navLabel: 'Megaport selector',
		title: 'Megaport selector',
		image: 'https://i.imgur.com/MKtF24C.png',
		description: `
					A performance selector for Megaport Festival.
					There are lots of shows in the two days, so I design a website
					to make scheduling easier. And people may participate the party with only mobile device,
					so RWD is required.
				`,
		url: 'https://musicfest.josephtseng-tw.com',
		tools: ['RWD web', 'React js', 'Gh-pages'],
	},
	{
		id: 'travel-split',
		navLabel: 'Travel Split',
		title: 'Travel Split',
		eyebrow: 'OAuth Application',
		placeholder: 'Travel Split',
		description:
			'Travel Split helps groups record shared travel expenses, calculate balances, and keep expense tracking clear throughout a trip.',
		sections: [
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
		],
		links: [
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Terms', href: '/terms' },
		],
	},
	{
		id: 'english-word-cards',
		navLabel: 'Word Cards',
		title: 'English Word Cards',
		eyebrow: 'OAuth Application',
		placeholder: 'Word Cards',
		description:
			'English Word Cards helps users collect unfamiliar English words and review them through a simple vocabulary learning workflow.',
		sections: [
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
		],
		links: [
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Terms', href: '/terms' },
		],
	},
	{
		id: 'google-sign-in',
		navLabel: 'Google Sign-In',
		title: 'Google Sign-In',
		eyebrow: 'Account Access',
		placeholder: 'Google',
		description:
			'Some applications support signing in with Google. Google Sign-In is used only to authenticate users and identify their accounts.',
		sections: [
			{
				title: 'Requested data',
				paragraphs: [
					'These applications request only basic profile information such as name, email address, profile image, and Google account identifier.',
					'They do not access Gmail, Google Drive, Google Calendar, contacts, or other Google services unless explicitly stated by the individual application.',
				],
			},
		],
		links: [
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Terms', href: '/terms' },
			{ label: 'Contact', href: '/' },
		],
	},
] satisfies Array<ComponentProps<typeof Project> & { navLabel: string; id: string }>;

function SectionRail({
	items,
	activeId,
	onSelect,
}: {
	items: { id: string; label: string }[];
	activeId: string;
	onSelect: (id: string) => void;
}) {
	const { classes } = useStyle();
	const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
		event.preventDefault();

		const section = document.getElementById(id);
		if (!section) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		onSelect(id);
		window.history.replaceState(null, '', `#${id}`);

		if (prefersReducedMotion) {
			section.scrollIntoView();
			return;
		}

		const startY = window.scrollY;
		const targetY = startY + section.getBoundingClientRect().top;
		const distance = targetY - startY;
		const duration = 650;
		const startedAt = performance.now();
		const easeInOutCubic = (progress: number) =>
			progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

		const animate = (currentTime: number) => {
			const elapsed = currentTime - startedAt;
			const progress = Math.min(elapsed / duration, 1);

			window.scrollTo(0, startY + distance * easeInOutCubic(progress));

			if (progress < 1) {
				window.requestAnimationFrame(animate);
			}
		};

		window.requestAnimationFrame(animate);
	};

	return (
		<nav className={classes.sectionNav} aria-label="Project sections">
			<ol className={classes.sectionNavList}>
				{items.map((item) => (
					<li key={item.id}>
						<a
							className={`${classes.sectionNavLink} ${activeId === item.id ? 'active' : ''}`}
							href={`#${item.id}`}
							aria-current={activeId === item.id ? 'location' : undefined}
							onClick={(event) => scrollToSection(event, item.id)}
						>
							{item.label}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}

export default function Projects() {
	const { classes } = useStyle();
	const [activeId, setActiveId] = useState('projects-intro');
	const railItems = useMemo(
		() => [{ id: 'projects-intro', label: 'Overview' }, ...projectItems.map(({ id, navLabel }) => ({ id, label: navLabel }))],
		[]
	);

	useEffect(() => {
		const sections = railItems
			.map((item) => document.getElementById(item.id))
			.filter((section): section is HTMLElement => Boolean(section));

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntry = entries
					.filter((entry) => entry.isIntersecting)
					.sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

				if (visibleEntry?.target.id) {
					setActiveId(visibleEntry.target.id);
				}
			},
			{
				rootMargin: '-35% 0px -50% 0px',
				threshold: [0.01, 0.2, 0.5],
			}
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, [railItems]);

	return (
		<div className={classes.projectsPage}>
			<div className={classes.content}>
				<TitleSection />
				<SectionRail items={railItems} activeId={activeId} onSelect={setActiveId} />
				{projectItems.map(({ navLabel, ...project }) => (
					<Project key={project.id} {...project} />
				))}
			</div>
		</div>
	);
}
