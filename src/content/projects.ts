import type { ComponentProps } from 'react';
import type Project from '../views/payload/project';

export type ProjectRecord = ComponentProps<typeof Project> & { navLabel: string; id: string };

const englishLearningProject = {
	id: 'english-word-cards',
	navLabel: 'English Learning',
	title: 'English Learning',
	eyebrow: 'Evolved from English Word Cards',
	description:
		'A personal language-learning app that grew from a Google Sheets and Apps Script vocabulary tool into a SvelteKit app with a FastAPI and PostgreSQL backend. Daily reviews and English/Japanese deck management share an authenticated, owner-scoped API.',
	sections: [
		{
			title: 'Review and management',
			items: [
				'Review due English cards with swipe or button controls.',
				'Manage English and Japanese decks and cards.',
				'Submit review decisions as an atomic, idempotent batch.',
			],
		},
		{
			title: 'Migration and boundaries',
			paragraphs: [
				'The current review flow uses FastAPI and PostgreSQL exclusively. Legacy Sheets data moves through a validated CSV import, without automatic Apps Script fallback or dual writes.',
			],
		},
	],
	links: [
		{ label: 'Read the case study', href: '/projects/english-learning/' },
		{ label: 'Source on GitHub', href: 'https://github.com/JosephT5566/english-learning' },
	],
	tools: [
		'SvelteKit',
		'TypeScript',
		'Python / FastAPI',
		'PostgreSQL',
		'SQLAlchemy / Alembic',
		'Google sign-in',
	],
} satisfies ProjectRecord;

const jopieProject = {
	id: 'jopie',
	links: [
		{ label: 'Read the case study', href: '/projects/jopie/' },
		{ label: 'Source on GitHub', href: 'https://github.com/JosephT5566/expense-app' },
	],
	navLabel: 'JoPie',
	title: 'JoPie',
	eyebrow: 'Personal & Household Expenses',
	description:
		'JoPie is a personal and household expense tracker with a mobile-friendly Traditional Chinese interface. It brings daily records, shared-cost settlement, recurring expenses, and AI-assisted entry into one app.',
	sections: [
		{
			title: 'Everyday expense tracking',
			items: [
				'Add and edit personal or household expenses',
				'Browse daily records, monthly category summaries, and charts',
				'Search expenses by keyword and settle shared household costs',
				'Schedule one-off expenses or daily, weekly, and monthly repeats',
			],
		},
		{
			title: 'AI-assisted entry',
			items: [
				'Describe an expense in natural language and answer follow-up questions for missing details',
				'View streamed analysis as complete, validated text entries save automatically',
				'Upload receipts, review and edit extracted items, exclude unwanted rows, and confirm before saving',
			],
		},
		{
			title: 'Built for daily use',
			items: [
				'Google sign-in and expense records through Supabase',
				'IndexedDB cache for previously loaded records',
				'Taiwan-local date and month boundaries',
				'Installable PWA with a statically built frontend',
			],
		},
	],
	tools: [
		'Svelte 5 / SvelteKit',
		'TypeScript',
		'Tailwind CSS / DaisyUI',
		'Supabase',
		'IndexedDB / PWA',
		'Python / FastAPI',
		'LangGraph / Gemini',
		'GitHub Pages',
	],
} satisfies ProjectRecord;

export const projectItems = [
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
		links: [{ label: 'Open live demo', href: 'https://musicfest.josephtseng-tw.com' }],
		tools: ['Responsive web', 'React'],
	},
	jopieProject,
	{
		id: 'travel-split',
		navLabel: 'Travel Split',
		title: 'Travel Split',
		eyebrow: 'OAuth Application',
		description:
			'Travel Split is a mobile-first trip expense app and travel-book companion that keeps Google Sheets as the source of truth while giving travelers a faster phone-friendly workflow.',
		sections: [
			{
				title: 'Features',
				items: [
					'Add expenses during a trip',
					'Choose an active trip sheet',
					'Track date, category, payer, currency, and split amounts',
					'Review day-based expenses',
					'View shared-cost summaries',
					'Open trip plan resources',
					'Use public mobile travel-book pages',
					'Keep loaded data available through persisted cache',
					'Google Sign-In authentication',
				],
			},
			{
				title: 'Data notes',
				items: [
					'Google Sheet-backed expense records',
					'Trip users, categories, currencies, dates, and resources from sheet config',
					'IndexedDB cache for previously loaded data',
					'Public travel-book routes for structured itinerary guides',
					'Mobile-first and offline-readable travel content',
					'No data selling',
					'Links to Privacy / Terms',
				],
			},
		],
		links: [
			{ label: 'Source on GitHub', href: 'https://github.com/JosephT5566/TravelSplit' },
			{ label: 'Joseph Apps', href: '/joseph-apps/' },
			{ label: 'Privacy', href: '/privacy/' },
			{ label: 'Terms', href: '/terms/' },
		],
		tools: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS / DaisyUI',
			'TanStack Query',
			'IndexedDB persistence',
			'Cloudflare Worker auth',
			'Google Cloud Functions',
			'Google Sheets',
			'PWA / static export',
		],
	},
	englishLearningProject,
] satisfies ProjectRecord[];

export type FeaturedProject = {
	id: string;
	title: string;
	summary: string;
	href: string;
	linkLabel: string;
};

export const featuredProjects: FeaturedProject[] = [
	{
		id: 'english-word-cards',
		title: englishLearningProject.title,
		summary:
			'A vocabulary app evolved into a full-stack learning project with an owner-scoped FastAPI API, PostgreSQL, and retry-safe review submissions.',
		href: '/projects/english-learning/',
		linkLabel: 'Read the English Learning case study',
	},
	{
		id: 'jopie',
		title: jopieProject.title,
		summary:
			'A personal and household expense app with shared-cost settlement, recurring records, and AI-assisted text and receipt entry.',
		href: '/projects/jopie/',
		linkLabel: 'Read the JoPie case study',
	},
	{
		id: 'travel-split',
		title: 'Travel Split',
		summary:
			'A mobile-first travel expense and itinerary companion that keeps Google Sheets as the source of truth.',
		href: '/projects/#travel-split',
		linkLabel: 'Explore Travel Split',
	},
];

export type CaseStudy = {
	id: string;
	title: string;
	summary: string;
	tools: string[];
	sourceUrl: string;
	sections: { title: string; paragraphs: string[] }[];
};

export const englishLearningCaseStudy: CaseStudy = {
	id: 'english-word-cards',
	title: englishLearningProject.title,
	summary:
		'A personal vocabulary app evolved from English Word Cards into a full-stack learning project with SvelteKit, FastAPI, and PostgreSQL.',
	tools: englishLearningProject.tools,
	sourceUrl: 'https://github.com/JosephT5566/english-learning',
	sections: [
		{
			title: 'Overview and my role',
			paragraphs: [
				'I build this personal project to practice backend ownership around a real daily review workflow. The app supports English reviews and shared English/Japanese deck and card management. This is personal project evidence alongside my professional frontend experience.',
			],
		},
		{
			title: 'Problem and constraints',
			paragraphs: [
				'The original English Word Cards app used Google Sheets and Apps Script. As the app grew, identity, card ownership, review scheduling, and retry behavior needed an explicit backend boundary. Existing vocabulary data also needed a controlled migration.',
			],
		},
		{
			title: 'Solution',
			paragraphs: [
				'A SvelteKit interface calls an authenticated FastAPI API backed by PostgreSQL. Users review due English cards with swipe or button controls and submit their decisions together. English and Japanese decks use the same management model.',
			],
		},
		{
			title: 'Engineering decisions',
			paragraphs: [
				'The backend verifies Google identity and scopes database operations to the authenticated owner. Review decisions commit current state and review events atomically. An idempotency key lets a retry return the same result instead of applying the review twice.',
				'A validated CSV import transfers legacy Sheets data into an owned deck. Current reviews use FastAPI and PostgreSQL exclusively, with no automatic Apps Script fallback or dual writes. Separate runtime and migration configuration supports the Cloud Run release workflow.',
			],
		},
		{
			title: 'Validation evidence',
			paragraphs: [
				'PostgreSQL integration checks cover ownership, review transactions, idempotent replay, and controlled imports. Browser checks cover the API cutover and deck/card management flow.',
			],
		},
		{
			title: 'Lessons and current limits',
			paragraphs: [
				'This project made retry semantics and transaction ownership concrete. A successful request, a timed-out request, and a safe retry need distinct behavior in both the UI and database.',
				'The app targets personal study. Daily review focuses on English, while deck and card management supports both English and Japanese.',
			],
		},
	],
};

export const jopieCaseStudy: CaseStudy = {
	id: 'jopie',
	title: jopieProject.title,
	summary:
		'A personal and household expense app that combines manual records, shared-cost settlement, and AI-assisted entry in a mobile-friendly Traditional Chinese interface.',
	tools: jopieProject.tools,
	sourceUrl: 'https://github.com/JosephT5566/expense-app',
	sections: [
		{
			title: 'Overview and my role',
			paragraphs: [
				'I build JoPie as a personal project around daily and household expense tracking. The app includes monthly summaries, recurring expenses, and shared-cost settlement. Its semantic-entry service lets me work across the frontend, API contract, and persistence boundary.',
			],
		},
		{
			title: 'Problem and constraints',
			paragraphs: [
				'Expense entry needs to work on a phone and handle personal and household records. Natural-language input may omit dates, amounts, categories, or members. Receipt extraction also needs a review step before it becomes an expense record.',
			],
		},
		{
			title: 'Solution',
			paragraphs: [
				'The SvelteKit app uses Supabase for sign-in and expense records, with IndexedDB caching for previously loaded data. Users can enter expenses manually, describe them in text, or review extracted receipt items.',
				'Text entry asks for missing details and saves complete, validated entries automatically. Receipt entry lets users edit or exclude extracted rows and explicitly confirm before saving. Those are separate confirmation flows.',
			],
		},
		{
			title: 'Engineering decisions',
			paragraphs: [
				'The Python/FastAPI semantic-entry service uses LangGraph and Gemini to interpret input while program rules control completeness and writes. Streamed analysis informs the user without becoming the source of truth for persistence.',
				'An unresolved request retains its identifier so the app can check status after an uncertain response. Conversation text stays in modal memory. The interface does not turn an ambiguous result into a success message. Taiwan-local date boundaries keep records aligned with daily and monthly views.',
			],
		},
		{
			title: 'Validation evidence',
			paragraphs: [
				'The repository defines frontend browser checks, service tests, cross-language contract parity checks, and synthetic evaluation fixtures. Fixture evaluation checks authored model outputs and normalization rules; it does not measure live model extraction quality.',
			],
		},
		{
			title: 'Lessons and current limits',
			paragraphs: [
				'AI-assisted entry needs explicit validation and recovery behavior around uncertain requests. Receipt review and automatic text saving need different interfaces because the user confirms different things.',
				'Hosted acceptance, service/schema alignment, and paid-model evaluation remain open work. Synthetic fixtures check normalization rules, so live extraction quality needs separate evaluation.',
			],
		},
	],
};
