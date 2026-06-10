import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Header from './views/layout/Header';
import Navigation from './views/layout/Navigation';
import Cover from './views/payload/cover';
import AboutMe from './views/payload/aboutMe';
import Experiences from './views/payload/experiences';
import Album from './views/payload/album';
import Interests from './views/payload/interests';
import Footer from './views/layout/Footer';
import Project from './views/payload/project';
import { HorizontalScroll_trans } from './components/shared/horizontalScroll';
import { APP_NAME } from './utils/static';

const useStyle = makeStyles()((theme) => ({
	page: {
		width: '100%',
		backgroundColor: theme.palette.background.default,
	},
}));

function Home() {
	return (
		<>
			<Cover />
			<AboutMe />
			<Experiences />
			<Album />
			<Interests />
			<Footer />
		</>
	);
}

function Projects() {
	return (
		<HorizontalScroll_trans>
			<Project
				title="Megaport selector"
				image="https://i.imgur.com/MKtF24C.png"
				description={`
					A performance selector for Megaport Festival.
					There are lots of shows in the two days, so I design a website
					to make scheduling easier. And people may participate the party with only mobile device,
					so RWD is required.
				`}
				url="https://musicfest.josephtseng-tw.com"
				tools={['RWD web', 'React js', 'Gh-pages']}
			/>
			<Project title="Next" />
		</HorizontalScroll_trans>
	);
}

export default function App() {
	const { classes } = useStyle();
	const [pathname, setPathname] = useState(window.location.pathname);
	const isProjectsPage = pathname === '/projects' || pathname === '/projects/';

	useEffect(() => {
		const handleNavigation = () => setPathname(window.location.pathname);
		window.addEventListener('popstate', handleNavigation);
		return () => window.removeEventListener('popstate', handleNavigation);
	}, []);

	useEffect(() => {
		document.title = isProjectsPage ? `Projects - ${APP_NAME}` : APP_NAME;
	}, [isProjectsPage]);

	useEffect(() => {
		console.log(`${__APP_NAME__} v${__APP_VERSION__}`);
	}, []);

	return (
		<div className={classes.page}>
			<Header />
			<Navigation />
			{isProjectsPage ? <Projects /> : <Home />}
		</div>
	);
}
