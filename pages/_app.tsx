import React, { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import Header from '../src/views/layout/Header'
import Footer from '../src/views/layout/Footer'
import Navigation from '../src/views/layout/Navigation'

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
			<title>123</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<ThemeProvider theme={theme}>
				<Navigation />
				<Header />
				<Component {...pageProps} />
				<Footer />
			</ThemeProvider>
		</React.Fragment>
	);
}

export default MyApp;
