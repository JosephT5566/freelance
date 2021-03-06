import { createTheme } from '@material-ui/core/styles';

import { palette } from './palette';
import { typography } from './typography';

declare module '@material-ui/core/styles/createTypography' {
	interface Typography {
		navWidth?: string;
		headerHeight?: string;
		tableHeadHeight?: string;
		tableHeadMarginBottom?: string;
		letterSpacing?: string;
	}
}

// Create a theme instance.
const theme = createTheme({ palette, typography });

export default theme;
