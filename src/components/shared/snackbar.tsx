import MaterialSnackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import WarningIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyle = makeStyles((theme) => ({
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

export default function Snackbar(props: { snackbarProps: SnackbarType; onClose: any }) {
	const classes = useStyle();
	const { snackbarProps, onClose } = props;

	const Icon = () => {
		switch (snackbarProps.severity) {
			case 'success':
				return <CheckIcon className={classes.icon} />;
			case 'warning':
				return <WarningIcon className={classes.icon} />;
			case 'error':
				return <ErrorIcon className={classes.icon} />;
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
