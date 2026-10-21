import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Menu, X } from 'lucide-react';
import { makeStyles } from 'tss-react/mui';

const items = [
	{ label: 'Work', href: '/#work' },
	{ label: 'Experience', href: '/#experience' },
	{ label: 'Beyond', href: '/#beyond' },
];
const useStyles = makeStyles()((theme) => ({
	desktop: { display: 'flex', gap: 36, [theme.breakpoints.down('sm')]: { display: 'none' } },
	link: {
		display: 'flex',
		alignItems: 'center',
		minHeight: 44,
		fontSize: 13,
		fontWeight: 500,
		'&:hover': { textDecoration: 'underline', textUnderlineOffset: 5 },
	},
	toggle: {
		color: theme.palette.primary.main,
		width: 44,
		height: 44,
		[theme.breakpoints.up('sm')]: { display: 'none' },
	},
	drawer: {
		width: 'min(320px, 88vw)',
		padding: 24,
		background: theme.palette.background.default,
		height: '100%',
		'& nav': { display: 'grid', marginTop: 32 },
		'& a': { fontSize: 24, padding: '16px 0' },
	},
	close: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
}));

export default function Navigation() {
	const { classes } = useStyles();
	const [open, setOpen] = useState(false);
	return (
		<>
			<nav className={classes.desktop} aria-label="Main navigation">
				{items.map((item) => (
					<a className={classes.link} href={item.href} key={item.href}>
						{item.label}
					</a>
				))}
			</nav>
			<IconButton
				className={classes.toggle}
				aria-label="Open navigation"
				aria-expanded={open}
				aria-controls={open ? 'mobile-navigation' : undefined}
				onClick={() => setOpen(true)}
			>
				<Menu size={22} />
			</IconButton>
			<Drawer anchor="right" open={open} onClose={() => setOpen(false)} transitionDuration={0}>
				<div className={classes.drawer} role="dialog" aria-modal="true" aria-label="Navigation">
					<div className={classes.close}>
						<span className="section-kicker" style={{ margin: 0 }}>
							Navigation
						</span>
						<IconButton aria-label="Close navigation" onClick={() => setOpen(false)}>
							<X />
						</IconButton>
					</div>
					<nav id="mobile-navigation" aria-label="Mobile navigation">
						{items.map((item) => (
							<a className={classes.link} href={item.href} key={item.href} onClick={() => setOpen(false)}>
								{item.label}
							</a>
						))}
					</nav>
				</div>
			</Drawer>
		</>
	);
}
