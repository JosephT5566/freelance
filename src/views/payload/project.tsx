import React from 'react';
import Link from 'next/link';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PopupAnimate from '../../components/shared/popupAnimate';

const useStyle = makeStyles()((theme) => ({
	project: {
		scrollMarginTop: '5rem',
		[theme.breakpoints.up('md')]: {
			maxHight: '100vh',
			padding: '6rem',
			flexShrink: 0,

			display: 'grid',
			gridTemplateColumns: 'minmax(0, 2fr) minmax(16rem, 1fr)',
			gridGap: '1rem',
		},
		[theme.breakpoints.down('md')]: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginBottom: '1em',
			scrollMarginTop: '9rem',
		},
	},
	header: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '1 / span 2',
			gridRow: '1 / 1',
		},
		[theme.breakpoints.down('md')]: {
			width: '100%',
			padding: '0 0.5rem',
		},
	},
	eyebrow: {
		marginBottom: '0.35rem',
		fontWeight: 700,
		letterSpacing: '0.08em',
		textTransform: 'uppercase',
		color: theme.palette.secondary.main,
	},
	title: {
		[theme.breakpoints.down('md')]: {
			alignSelf: 'flex-start',
			marginBottom: '0.5em',
		},
	},
	descriptionTitle: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '2 / 2',
		},
		[theme.breakpoints.down('md')]: {
			alignSelf: 'flex-start',
			paddingLeft: '0.5rem',
			marginBottom: '0.5em',
		},
	},
	description: {
		width: '100%',
		[theme.breakpoints.down('md')]: {
			padding: '0',
		},
		'& > hr': {
			marginBottom: '1em',
		},
		'& .content': {
			marginBottom: '1em',
		},
	},
	contentPanel: {
		width: '100%',
		minWidth: 0,
		[theme.breakpoints.up('md')]: {
			gridColumn: '2 / 2',
			gridRow: '2 / span 4',
			overflow: 'auto',
			paddingRight: '0.25rem',
		},
		[theme.breakpoints.down('md')]: {
			padding: '0 0.5rem',
		},
	},
	section: {
		marginBottom: '1em',
	},
	sectionList: {
		margin: '0.25em 0 1em',
		paddingLeft: '1.2em',
		'& li': {
			marginBottom: '0.25em',
		},
	},
	links: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '0.5rem',
		marginTop: '1rem',
	},
	link: {
		border: `1px solid ${theme.palette.primary.light}`,
		borderRadius: '0.5rem',
		padding: '0.45rem 0.75rem',
		fontWeight: 700,
		color: theme.palette.primary.main,
		transition: '0.2s',
		'&:hover, &:focus': {
			color: theme.palette.secondary.main,
			borderColor: theme.palette.secondary.main,
			outline: 'none',
		},
	},
	footerNote: {
		marginTop: '1rem',
		color: theme.palette.primary.light,
	},
	image: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: '0.5em',
		[theme.breakpoints.up('md')]: {
			gridColumn: '1 / 1',
			gridRow: '2 / span 6',
		},
		[theme.breakpoints.down('md')]: {
			width: 'calc(100% - 1em)',
			paddingTop: '56.25%',
		},
		'&.default': {
			backgroundColor: theme.palette.background.paper,
			padding: '1em',
			display: 'flex',
			alignItems: 'flex-end',
			color: theme.palette.text.secondary,
			fontSize: '2em',
			[theme.breakpoints.down('md')]: {
				alignItems: 'flex-start',
			},
			'& > h1': {
				fontFamily: 'Lobster',
			},
		},
		'&:hover': {
			cursor: 'pointer',
		},
	},
	tools: {
		[theme.breakpoints.up('md')]: {
			gridColumn: '2',
			gridRow: '6 / span 2',
			alignSelf: 'end',
		},
		[theme.breakpoints.down('md')]: {
			padding: '0 0.5rem',
			alignSelf: 'flex-end',
		},
	},
}));

type ProjectSection = {
	title: string;
	paragraphs?: string[];
	items?: string[];
};

type ProjectLink = {
	label: string;
	href: string;
};

function ProjectLinkItem({ link, className }: { link: ProjectLink; className: string }) {
	if (link.href.startsWith('/')) {
		return (
			<Link className={className} href={link.href}>
				{link.label}
			</Link>
		);
	}

	return (
		<a className={className} href={link.href} target="_blank" rel="noopener noreferrer">
			{link.label}
		</a>
	);
}

export default function Project(props: {
	id?: string;
	title: string;
	eyebrow?: string;
	description?: string;
	descriptionTitle?: string;
	image?: string;
	placeholder?: string;
	url?: string;
	tools?: string[];
	sections?: ProjectSection[];
	links?: ProjectLink[];
	footerNote?: string;
	titleComponent?: 'h1' | 'h2';
}) {
	const {
		id,
		title,
		eyebrow,
		description,
		descriptionTitle = 'Description',
		image,
		placeholder = 'Coming Soon...',
		url,
		tools,
		sections,
		links,
		footerNote,
		titleComponent = 'h2',
	} = props;
	const { classes } = useStyle();
	const theme = useTheme();
	const isViewPortLarge = useMediaQuery(theme.breakpoints.up('md'));
	const hasContent = Boolean(description || sections?.length || links?.length || footerNote);

	const openProject = () => {
		if (!url) return;
		window.open(url, '_blank', 'noopener,noreferrer')?.focus();
	};

	return (
		<article className={classes.project} id={id}>
			<header className={classes.header}>
				{eyebrow && (
					<Typography className={classes.eyebrow} variant="body1">
						{eyebrow}
					</Typography>
				)}
				<Typography className={classes.title} variant="h1" component={titleComponent}>
					{title}
				</Typography>
			</header>
			{image ? (
				<div
					className={classes.image}
					style={{ backgroundImage: `url(${image})` }}
					onClick={openProject}
					onKeyDown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							openProject();
						}
					}}
					role={url ? 'link' : undefined}
					tabIndex={url ? 0 : undefined}
					aria-label={url ? `Open ${title}` : undefined}
				/>
			) : (
				<div className={`${classes.image} default`}>
					<PopupAnimate disabled={isViewPortLarge}>
						<Typography variant="h1">{placeholder}</Typography>
					</PopupAnimate>
				</div>
			)}
			{hasContent && (
				<div className={classes.contentPanel}>
					{description && (
						<>
							<Typography className={classes.descriptionTitle} variant="h2" component="h3">
								{descriptionTitle}
							</Typography>
							<div className={classes.description}>
								<PopupAnimate disabled={isViewPortLarge}>
									<Typography className="content" variant="body1">
										{description}
									</Typography>
								</PopupAnimate>
								<Divider />
							</div>
						</>
					)}
					{sections?.map((section) => (
						<section className={classes.section} key={section.title}>
							<Typography variant="h3" component="h3">
								{section.title}
							</Typography>
							{section.paragraphs?.map((paragraph) => (
								<Typography className="content" variant="body1" key={paragraph}>
									{paragraph}
								</Typography>
							))}
							{section.items && (
								<ul className={classes.sectionList}>
									{section.items.map((item) => (
										<Typography component="li" variant="body1" key={item}>
											{item}
										</Typography>
									))}
								</ul>
							)}
						</section>
					))}
					{links && (
						<nav className={classes.links} aria-label={`${title} links`}>
							{links.map((link) => (
								<ProjectLinkItem className={classes.link} key={`${link.label}-${link.href}`} link={link} />
							))}
						</nav>
					)}
					{footerNote && (
						<Typography className={classes.footerNote} variant="body1">
							{footerNote}
						</Typography>
					)}
				</div>
			)}
			{tools && (
				<div className={classes.tools}>
					{tools.map((tool, index) => (
						<Typography key={index} variant="body1">
							{tool}
						</Typography>
					))}
				</div>
			)}
		</article>
	);
}
