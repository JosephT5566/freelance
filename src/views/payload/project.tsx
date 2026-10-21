import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
	project: { paddingBlock: 48, borderTop: '1px solid rgba(37,66,81,.25)' },
	header: { marginBottom: 24 },
	title: { fontSize: 'clamp(2.25rem, 4vw, 3.25rem)' },
	columns: {
		display: 'grid',
		gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
		gap: 56,
		[theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 28 },
	},
	description: { margin: 0 },
	image: {
		display: 'block',
		marginTop: 0,
		'& img': {
			display: 'block',
			width: '100%',
			height: 'auto',
			aspectRatio: '16 / 10',
			objectFit: 'cover',
			objectPosition: 'top',
			background: '#e5e8e5',
		},
	},
	section: {
		marginBottom: 28,
		'& h3': { marginBottom: 12 },
		'& p': { marginBottom: 12 },
		'& ul': { paddingLeft: 20, margin: 0 },
		'& li': { paddingLeft: 4, marginBottom: 8 },
	},
	links: { display: 'flex', flexWrap: 'wrap', gap: '4px 24px', marginTop: 20 },
	tools: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '8px 20px',
		padding: 0,
		margin: '24px 0 0',
		listStyle: 'none',
		fontSize: 12,
		fontWeight: 500,
	},
	note: { marginTop: 24 },
}));

type ProjectSection = { title: string; paragraphs?: string[]; items?: string[] };
type ProjectLink = { label: string; href: string };

export default function Project({
	id,
	title,
	eyebrow,
	description,
	image,
	url,
	tools,
	sections,
	links,
	footerNote,
	titleComponent = 'h2',
}: {
	id?: string;
	title: string;
	eyebrow?: string;
	description?: string;
	image?: string;
	url?: string;
	tools?: string[];
	sections?: ProjectSection[];
	links?: ProjectLink[];
	footerNote?: string;
	titleComponent?: 'h1' | 'h2';
}) {
	const { classes } = useStyles();
	return (
		<article className={classes.project} id={id}>
			<header className={classes.header}>
				{eyebrow && <p className="section-kicker">{eyebrow}</p>}
				<Typography className={classes.title} variant="h2" component={titleComponent}>
					{title}
				</Typography>
			</header>
			<div className={classes.columns}>
				<div>
					{description && (
						<Typography className={classes.description} variant="body1">
							{description}
						</Typography>
					)}
					{tools && (
						<ul className={classes.tools} aria-label={`${title} technology`}>
							{tools.map((tool) => (
								<li key={tool}>{tool}</li>
							))}
						</ul>
					)}
					{links && (
						<nav className={classes.links} aria-label={`${title} links`}>
							{links.map((link) =>
								link.href.startsWith('/') ? (
									<Link key={link.href} className="text-link" href={link.href}>
										{link.label}
										<ArrowUpRight size={16} aria-hidden="true" />
									</Link>
								) : (
									<a
										key={link.href}
										className="text-link"
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{link.label}
										<ArrowUpRight size={16} aria-hidden="true" />
									</a>
								),
							)}
						</nav>
					)}
					{footerNote && (
						<Typography className={classes.note} variant="body1">
							{footerNote}
						</Typography>
					)}
				</div>
				<div>
					{image &&
						(url ? (
							<a
								className={classes.image}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open ${title} live demo`}
							>
								<img
									src={image}
									alt={`${title} homepage`}
									width={960}
									height={600}
									loading="lazy"
								/>
							</a>
						) : (
							<div className={classes.image}>
								<img src={image} alt={title} width={960} height={600} loading="lazy" />
							</div>
						))}
					{sections?.map((section) => (
						<section className={classes.section} key={section.title}>
							<Typography variant="h3" component="h3">
								{section.title}
							</Typography>
							{section.paragraphs?.map((paragraph) => (
								<Typography variant="body1" key={paragraph}>
									{paragraph}
								</Typography>
							))}
							{section.items && (
								<ul>
									{section.items.map((item) => (
										<li key={item}>
											<Typography variant="body1">{item}</Typography>
										</li>
									))}
								</ul>
							)}
						</section>
					))}
				</div>
			</div>
		</article>
	);
}
