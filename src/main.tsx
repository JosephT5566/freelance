import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from './createEmotionCache';
import App from './App';
import theme from '../styles/theme';
import '../styles/globals.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Root element not found');
}

createRoot(root).render(
	<StrictMode>
		<CacheProvider value={createEmotionCache()}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</CacheProvider>
	</StrictMode>
);
