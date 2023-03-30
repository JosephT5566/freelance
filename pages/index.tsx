import { makeStyles } from 'tss-react/mui';

import Head from 'next/head';
import Image from 'next/image';

import Cover from '../src/views/payload/cover';
import AboutMe from '../src/views/payload/aboutMe';
import Experiences from '../src/views/payload/experiences';
import Album from '../src/views/payload/album';
import Interests from '../src/views/payload/interests';
import Footer from '../src/views/layout/Footer';
import { APP_NAME } from '../src/utils/static';

const useStyle = makeStyles()((theme) => ({
	home: {
		width: '100%',
		backgroundColor: theme.palette.background.default,
	},
}));

export default function Home() {
	const { classes } = useStyle();
	console.log(`${process.env.NEXT_PUBLIC_NAME} v${process.env.NEXT_PUBLIC_VERSION}`);

	return (
		<div className={classes.home}>
			<Head>
				<title>{APP_NAME}</title>
			</Head>

			<Cover />
			<AboutMe />
			<Experiences />
			<Album />
			<Interests />
			<Footer />
		</div>
	);
}
