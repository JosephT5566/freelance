import { makeStyles } from '@material-ui/core/styles';

import Head from 'next/head';
import Image from 'next/image';

import Cover from '../src/views/payload/cover';
import AboutMe from '../src/views/payload/aboutMe';
import Experiences from '../src/views/payload/experiences';
import Album from '../src/views/payload/album';
import Interests from '../src/views/payload/interests';

const useStyle = makeStyles((theme) => ({
	home: {
		backgroundColor: theme.palette.background.default,
	},
}));

export default function Home() {
	const classes = useStyle();

	return (
		<div className={classes.home}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Cover />
			<AboutMe />
			<Experiences />
			<Album />
			<Interests />
		</div>
	);
}
