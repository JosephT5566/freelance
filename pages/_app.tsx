import React, { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import Header from '../src/views/layout/Header';
import Navigation from '../src/views/layout/Navigation';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<ThemeProvider theme={theme}>
				<Header />
				<Navigation />
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	);
}

export default MyApp;
