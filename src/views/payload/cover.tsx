import React from 'react';
import { makeStyles } from 'tss-react/mui';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { RESUME_URL } from '../../utils/static';

const Sphere = dynamic(() => import('./sphere'), { ssr: false });

const useStyle = makeStyles()((theme) => ({
	cover: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100vh',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	actions: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '0.75rem',
		marginTop: '1.5rem',
		fontFamily: theme.typography.fontFamily,
		fontSize: '1rem',
		'& a': {
			padding: '0.7rem 1rem',
			border: `1px solid ${theme.palette.text.secondary}`,
			borderRadius: '0.5rem',
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.text.secondary,
			'&:hover': { textDecoration: 'underline' },
			'&:focus-visible': { outline: `2px solid ${theme.palette.text.secondary}`, outlineOffset: '4px' },
		},
	},
	text: {
		fontFamily: 'Lobster',
		zIndex: 1,
		position: 'absolute',
		bottom: '4rem',
		left: '3rem',
		right: '1.5rem',
		[theme.breakpoints.down('sm')]: { left: '1.5rem' },
		color: theme.palette.text.secondary,
		'& h1': {
			textShadow: '0 2px 5px rgba(0, 0, 0, 0.8)',
			[theme.breakpoints.up('md')]: {
				fontSize: '5vw',
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '10vw',
			},
			fontWeight: 'normal',
			margin: '0',
		},
	},
}));

export default function Cover() {
	const { classes } = useStyle();
	return (
		<div className={classes.cover} style={{ backgroundImage: `url(/cover.jpg)` }}>
			<div className={classes.text}>
				<h1>
					JOSEPH TSENG
					<br />
					<span>SOFTWARE ENGINEER</span>
				</h1>
				<div className={classes.actions}>
					<Link href="/projects/">View projects</Link>
					<a href={RESUME_URL} download>
						Download resume (PDF)
					</a>
					<a href="#contact">Get in touch</a>
				</div>
			</div>
			<Sphere />
		</div>
	);
}
