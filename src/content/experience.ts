export type ExperienceRecord = {
	year: string;
	role: string;
	company: string;
	highlights: string[];
};

export const experienceIntro =
	'Nearly a decade of engineering experience spanning web products, marketplace and CMS platforms, embedded firmware, production tooling, quality ownership, and cross-functional delivery.';

export const skillGroups = [
	{
		title: 'Core Engineering',
		lines: [
			'TypeScript, JavaScript, React, Next.js, SvelteKit, HTML, CSS, SQL',
			'GraphQL, Supabase, PostgreSQL, API integration, frontend architecture',
		],
	},
	{
		title: 'Quality & Delivery',
		lines: [
			'A/B testing, QA planning, feature flags, bug bash coordination, root-cause debugging',
			'Prismic, Amplitude, Redash, Coralogix, Jira, GitHub Actions, CI/CD',
		],
	},
];

export const experiences: ExperienceRecord[] = [
	{
		year: '2022 - 2026',
		role: 'Software Engineer',
		company: 'Houzz | Marketplace, Lead Nurture, and 3D',
		highlights: [
			'Delivered marketplace search and browse improvements across desktop and mobile web, including A/B-tested discovery experiences.',
			'Built reusable Prismic CMS page patterns with GraphQL schema and resolver support for landing pages, campaigns, and event experiences.',
			'Integrated frontend workflows with personalization, 3D, and external AI services while working across product, platform, backend, and data teams.',
			'Improved release quality through design docs, feature flags, QA guides, bug bashes, production debugging, analytics, and release monitoring.',
		],
	},
	{
		year: '2020 - 2022',
		role: 'Frontend Engineer',
		company: 'Chung Yung Consultant Company | Taipei',
		highlights: [
			'Built responsive membership and administration applications using React, Next.js, TypeScript, HTML, and CSS.',
			'Implemented authentication and state flows with XState, API integrations, form-driven interfaces, and PostgreSQL changes.',
			'Supported GitHub-based CI/CD and GitOps deployment workflows on cloud infrastructure.',
		],
	},
	{
		year: '2016 - 2020',
		role: 'Firmware & Application Engineer',
		company: 'Foxconn, Mega Design Tech, and Memoright Tech | Hsinchu',
		highlights: [
			'Developed embedded firmware, memory-controller test patterns, and production application tooling using C, C++, and C#.',
			'Established Ceedling unit tests for driver development to improve test coverage and reliability.',
		],
	},
];

export const houzzSummary = [
	'Delivered marketplace discovery and reusable CMS campaign experiences with React, TypeScript, and GraphQL.',
	'Worked across product, design, backend, and data teams on experiments, integrations, and release quality.',
];
