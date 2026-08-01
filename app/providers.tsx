'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { ReactNode, StrictMode } from 'react';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../styles/theme';

const clientSideEmotionCache = createEmotionCache();

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<StrictMode>
			<CacheProvider value={clientSideEmotionCache}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</CacheProvider>
		</StrictMode>
	);
}
