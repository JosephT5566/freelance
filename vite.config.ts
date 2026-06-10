import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import packageJson from './package.json';

export default defineConfig({
	plugins: [react(), svgr()],
	optimizeDeps: {
		include: [
			'@emotion/cache',
			'@emotion/react',
			'@emotion/styled',
			'@mui/styled-engine',
			'@mui/system',
			'@mui/material',
			'hoist-non-react-statics',
		],
		exclude: [
			'tss-react',
			'tss-react/mui',
		],
	},
	define: {
		__APP_NAME__: JSON.stringify(packageJson.name),
		__APP_VERSION__: JSON.stringify(packageJson.version),
	},
});
