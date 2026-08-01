import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	trailingSlash: true,
	turbopack: {
		root: process.cwd(),
	},
	images: {
		unoptimized: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

export default nextConfig;
