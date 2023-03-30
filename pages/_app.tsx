import React, { useEffect } from 'react';
import '../styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import Header from '../src/views/layout/Header';
import Navigation from '../src/views/layout/Navigation';
import createEmotionCache from '../src/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<CacheProvider value={emotionCache}>
			<React.Fragment>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<ThemeProvider theme={theme}>
					<Header />
					<Navigation />
					<Component {...pageProps} />
				</ThemeProvider>
			</React.Fragment>
		</CacheProvider>
	);
}

export default MyApp;
