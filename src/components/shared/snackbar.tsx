import type { ComponentProps } from 'react';
import MaterialSnackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SnackbarType {
	__typename: 'Snackbar';
	open: boolean;
	message: string;
	severity: Severity;
}

type Severity = 'success' | 'warning' | 'error';

export const defaultSnackbarProps: SnackbarType = {
	__typename: 'Snackbar',
	open: false,
	message: '',
	severity: 'success',
};

const useStyle = makeStyles()((theme) => ({
	snackbar: {},
	content: {
		borderRadius: '1em',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		fontWeight: 'bold',
		color: theme.palette.text.secondary,
		backgroundColor: theme.palette.success.main,
		padding: '1em',
		'&.success': {
			backgroundColor: theme.palette.success.main,
		},
		'&.warning': {
			backgroundColor: theme.palette.warning.main,
		},
		'&.error': {
			backgroundColor: theme.palette.error.main,
		},
	},
	icon: {
		marginRight: '0.5em',
	},
}));

type SnackbarCloseHandler = ComponentProps<typeof MaterialSnackbar>['onClose'];

export default function Snackbar(props: { snackbarProps: SnackbarType; onClose: SnackbarCloseHandler }) {
	const { classes } = useStyle();
	const { snackbarProps, onClose } = props;

	const Icon = () => {
		switch (snackbarProps.severity) {
			case 'success':
				return <CheckCircle className={classes.icon} />;
			case 'warning':
				return <AlertTriangle className={classes.icon} />;
			case 'error':
				return <XCircle className={classes.icon} />;
			default:
				return null;
		}
	};

	return (
		<MaterialSnackbar
			className={classes.snackbar}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={snackbarProps.open}
			onClose={onClose}
			TransitionComponent={Slide}
		>
			<div className={`${classes.content} ${snackbarProps.severity}`}>
				<Icon />
				<Typography variant={'body1'}>{snackbarProps.message}</Typography>
			</div>
		</MaterialSnackbar>
	);
}
