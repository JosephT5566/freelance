import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { ServerStyleSheets } from '@mui/styles';
import { getInitColorSchemeScript } from '@mui/material/styles';
import theme from '../styles/theme';
import createEmotionCache from '../src/createEmotionCache';

export default class MyDocument extends Document {
	render() {
		const { emotionStyleTags } = this.props;

		return (
			<Html lang="zh-TW">
				<Head>
					<link rel="icon" href="/favicon.png" />
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
						rel="stylesheet"
					/>
					<meta property="og:title" content="This is Joseph" />
					<meta property="og:description" content="Portfolio of Joseph frontend developer." />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="/cover.jpg" />
					<meta property="og:site_name" content="This is Joseph" />
					<meta property="og:url" content="https://josephtseng-tw.com/" />
					<meta name="description" content="Portfolio of Joseph frontend developer." />
					<link rel="manifest" href="/manifest.json" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Lobster&family=Vidaloka&family=Montserrat&display=swap"
						rel="stylesheet"
					/>
					{emotionStyleTags}
				</Head>
				<body>
					{getInitColorSchemeScript()}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}

	static async getInitialProps(ctx) {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
		// However, be aware that it can have global side effects.
		const cache = createEmotionCache();
		const { extractCriticalToChunks } = createEmotionServer(cache);

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App) => (props) => sheets.collect(<App emotionCache={cache} {...props} />),
			});

		const initialProps = await Document.getInitialProps(ctx);

		// Generate style tags for the styles coming from Emotion
		// This is important. It prevents Emotion from rendering invalid HTML.
		// See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
		const emotionStyles = extractCriticalToChunks(initialProps.html);
		const emotionStyleTags = emotionStyles.styles.map((style) => (
			<style
				data-emotion={`${style.key} ${style.ids.join(' ')}`}
				key={style.key}
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: style.css }}
			/>
		));

		// Generate the css string for the styles coming from jss
		let css = sheets.toString();

		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [
				...emotionStyleTags,
				<style
					id="jss-server-side"
					key="jss-server-side"
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: css }}
				/>,
				...React.Children.toArray(initialProps.styles),
				sheets.getStyleElement(),
			],
		};
	}
}
