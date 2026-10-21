import { makeStyles } from 'tss-react/mui';
import Navigation from './Navigation';

const useStyles = makeStyles()((theme) => ({
	header: {
		position: 'sticky',
		top: 0,
		zIndex: theme.zIndex.appBar,
		background: theme.palette.background.default,
		borderBottom: '1px solid rgba(37,66,81,.18)',
	},
	inner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 76 },
	brand: {
		display: 'inline-flex',
		alignItems: 'center',
		minHeight: 44,
		fontSize: 14,
		fontWeight: 600,
		letterSpacing: '.02em',
		gap: 10,
		'&::before': {
			content: '""',
			width: 8,
			height: 8,
			background: theme.palette.secondary.main,
			borderRadius: '50%',
		},
	},
}));

export default function Header() {
	const { classes } = useStyles();
	return (
		<header className={classes.header}>
			<div className={`site-container ${classes.inner}`}>
				<a className={classes.brand} href="/">
					Joseph Tseng
				</a>
				<Navigation />
			</div>
		</header>
	);
}
