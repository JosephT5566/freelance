import Link from 'next/link';
import styles from './infoPages.module.css';

const LAST_UPDATED = 'August 3, 2026';
const CONTACT_EMAIL = 'zxp930110gg@gmail.com';
const CURRENT_YEAR = 2026;

type ProjectCardProps = {
	title: string;
	description: string;
};

function ProjectCard({ title, description }: ProjectCardProps) {
	return (
		<article className={styles.card}>
			<h2 className={styles.cardTitle}>{title}</h2>
			<p className={styles.cardText}>{description}</p>
		</article>
	);
}

type ProjectDetailProps = {
	title: string;
	description: string;
	features: string[];
	googleUsage: string[];
	dataNotes: string[];
};

function ProjectDetail({ title, description, features, googleUsage, dataNotes }: ProjectDetailProps) {
	return (
		<section className={styles.section} aria-labelledby={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>
			<h2 className={styles.sectionHeader} id={`${title.toLowerCase().replaceAll(' ', '-')}-title`}>
				{title}
			</h2>
			<article className={styles.card}>
				<p className={styles.textBlock}>{description}</p>
				<div className={styles.details}>
					<div>
						<h3 className={styles.cardTitle}>Features</h3>
						<ul className={styles.list}>
							{features.map((feature) => (
								<li key={feature}>{feature}</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className={styles.cardTitle}>Google data usage</h3>
						{googleUsage.map((paragraph) => (
							<p className={styles.textBlock} key={paragraph}>
								{paragraph}
							</p>
						))}
					</div>
					<div>
						<h3 className={styles.cardTitle}>Data notes</h3>
						<ul className={styles.list}>
							{dataNotes.map((note) => (
								<li key={note}>{note}</li>
							))}
						</ul>
					</div>
				</div>
			</article>
		</section>
	);
}

function PageLinks() {
	return (
		<nav className={styles.links} aria-label="Page links">
			<Link className={styles.link} href="/projects">
				Projects
			</Link>
			<Link className={styles.link} href="/projects/joseph-oauth">
				Joseph OAuth
			</Link>
			<Link className={styles.link} href="/legal">
				Legal
			</Link>
		</nav>
	);
}

function PageFooter() {
	return <footer className={styles.footer}>© {CURRENT_YEAR} Joseph Tseng</footer>;
}

export function ProjectsContent() {
	return (
		<>
			<main className={styles.page}>
				<div className={styles.container}>
					<header className={styles.hero}>
						<p className={styles.eyebrow}>Side Projects</p>
						<h1 className={styles.title}>Joseph&apos;s Projects</h1>
						<p className={styles.lead}>
							A collection of personal applications built by Joseph Tseng to solve everyday problems and explore
							better product experiences.
						</p>
						<PageLinks />
					</header>

					<section className={styles.section} aria-labelledby="new-projects-title">
						<h2 className={styles.sectionHeader} id="new-projects-title">
							New Projects
						</h2>
						<div className={styles.grid}>
							<ProjectCard
								title="Travel Split"
								description="A travel expense management app that helps groups record shared expenses and understand who owes whom."
							/>
							<ProjectCard
								title="English Word Cards"
								description="A vocabulary learning app for collecting, reviewing, and practicing English words."
							/>
						</div>
					</section>

					<section className={styles.section} aria-labelledby="google-sign-in-title">
						<h2 className={styles.sectionHeader} id="google-sign-in-title">
							Google Sign-In
						</h2>
						<article className={styles.card}>
							<p className={styles.textBlock}>
								Some applications support signing in with Google. Google Sign-In is used only to authenticate users
								and identify their accounts.
							</p>
							<p className={styles.textBlock}>
								These applications request only basic profile information such as name, email address, profile image,
								and Google account identifier.
							</p>
							<p className={styles.textBlock}>
								They do not access Gmail, Google Drive, Google Calendar, contacts, or other Google services unless
								explicitly stated by the individual application.
							</p>
							<nav className={styles.links} aria-label="Project policy links">
								<Link className={styles.link} href="/privacy">
									Privacy
								</Link>
								<Link className={styles.link} href="/terms">
									Terms
								</Link>
								<Link className={styles.link} href="/">
									Contact
								</Link>
							</nav>
						</article>
					</section>

					<ProjectDetail
						title="Travel Split"
						description="Travel Split helps groups record shared travel expenses, calculate balances, and keep expense tracking clear throughout a trip."
						features={[
							'Record shared expenses',
							'Assign payer and participants',
							'Calculate balances',
							'Review trip expenses',
							'Google Sign-In authentication',
						]}
						googleUsage={[
							'Travel Split uses Google Sign-In to authenticate users and associate expense data with their accounts.',
							'The application may receive basic account information including name, email address, profile image, and Google account identifier.',
							"Travel Split does not access Gmail, Google Drive, Google Calendar, contacts, or the user's Google password.",
						]}
						dataNotes={[
							'User-generated expense data',
							'Authentication only for identity',
							'No data selling',
							'Links to Privacy / Terms',
						]}
					/>

					<ProjectDetail
						title="English Word Cards"
						description="English Word Cards helps users collect unfamiliar English words and review them through a simple vocabulary learning workflow."
						features={[
							'Save vocabulary',
							'Add notes / definitions',
							'Review words',
							'Organize learning list',
							'Google Sign-In authentication',
						]}
						googleUsage={[
							'English Word Cards uses Google Sign-In to authenticate users and associate saved vocabulary with their accounts.',
							'The application may receive basic account information including name, email address, profile image, and Google account identifier.',
							"It does not access Gmail, Google Drive, Google Calendar, contacts, or the user's Google password.",
						]}
						dataNotes={[
							'User-generated vocabulary',
							'Identity-based authentication',
							'No data selling',
							'Privacy / Terms links',
						]}
					/>
				</div>
			</main>
			<PageFooter />
		</>
	);
}

export function LegalContent() {
	return (
		<>
			<main className={styles.page}>
				<div className={styles.container}>
					<header className={styles.hero}>
						<p className={styles.eyebrow}>Legal</p>
						<h1 className={styles.title}>Policies, plainly stated.</h1>
						<p className={styles.lead}>
							Read how Joseph&apos;s applications handle your information and the terms that apply when you use them.
						</p>
						<PageLinks />
					</header>

					<section className={styles.grid} aria-label="Legal documents">
						<Link className={styles.documentCard} href="/privacy">
							<span className={styles.documentLabel}>Your information</span>
							<h2 className={styles.cardTitle}>Privacy Policy</h2>
							<p className={styles.cardText}>
								What information the applications collect, why it is used, and how it is protected.
							</p>
							<span className={styles.documentAction}>
								Read privacy policy <span aria-hidden="true">→</span>
							</span>
						</Link>
						<Link className={styles.documentCard} href="/terms">
							<span className={styles.documentLabel}>Using the applications</span>
							<h2 className={styles.cardTitle}>Terms of Service</h2>
							<p className={styles.cardText}>
								The responsibilities, limitations, and conditions that apply when using the applications.
							</p>
							<span className={styles.documentAction}>
								Read terms of service <span aria-hidden="true">→</span>
							</span>
						</Link>
					</section>
				</div>
			</main>
			<PageFooter />
		</>
	);
}

export function PrivacyContent() {
	return (
		<>
			<main className={styles.page}>
				<div className={styles.container}>
					<header className={styles.hero}>
						<h1 className={styles.title}>Privacy Policy</h1>
						<p className={styles.lastUpdated}>Last updated: {LAST_UPDATED}</p>
						<PageLinks />
					</header>
					<article>
						<ol className={styles.legalList}>
							<li>
								<h2>1. Overview</h2>
								<p>
									This Privacy Policy explains how Joseph OAuth and Joseph Tseng&apos;s supported applications
									collect, use, and protect information for authentication and app functionality.
								</p>
							</li>
							<li>
								<h2>2. Applications Covered</h2>
								<p>This policy applies to Joseph OAuth, Travel Split, and English Word Cards.</p>
							</li>
							<li>
								<h2>3. Information We Collect</h2>
								<p>
									Applications may collect basic Google OAuth profile data: name, email, profile image, and Google
									account ID.
								</p>
								<p>
									Applications may also store user-generated app data, including Travel Split expenses and English
									Word Cards vocabulary.
								</p>
							</li>
							<li>
								<h2>4. Google Sign-In</h2>
								<p>
									Joseph OAuth provides Google Sign-In for the supported applications. It is used to authenticate
									users and identify their accounts. Joseph OAuth and the supported applications do not store
									Google passwords.
								</p>
								<p>
									They do not access Gmail, Google Drive, Google Calendar, contacts, or other Google services unless
									explicitly stated by an individual application.
								</p>
							</li>
							<li>
								<h2>5. How We Use Information</h2>
								<p>
									Information is used to provide account-based access, associate user data with the correct account,
									and support core app features.
								</p>
								<p>Information is not sold and is not used for advertising tracking.</p>
							</li>
							<li>
								<h2>6. Data Storage and Security</h2>
								<p>
									Joseph OAuth session records may be stored in Cloudflare KV, and application data may be stored
									using other third-party cloud services. Reasonable safeguards are used to protect stored
									information, but no online service can guarantee absolute security.
								</p>
							</li>
							<li>
								<h2>7. Data Sharing</h2>
								<p>
									Personal data is not sold. Data may be processed by third-party cloud services used to operate the
									applications.
								</p>
							</li>
							<li>
								<h2>8. Data Retention and Deletion</h2>
								<p>Data may be retained while an account or application record remains active.</p>
								<p>Users may request deletion of their data by contacting {CONTACT_EMAIL}.</p>
							</li>
							<li>
								<h2>9. Children&apos;s Privacy</h2>
								<p>
									These applications are not intended for children. Children should not provide personal information
									through these applications.
								</p>
							</li>
							<li>
								<h2>10. Changes</h2>
								<p>
									This policy may be updated as the applications change. Updates will be reflected by the last
									updated date on this page.
								</p>
							</li>
							<li>
								<h2>11. Contact</h2>
								<p>Contact: {CONTACT_EMAIL}</p>
							</li>
						</ol>
					</article>
				</div>
			</main>
			<PageFooter />
		</>
	);
}

export function TermsContent() {
	return (
		<>
			<main className={styles.page}>
				<div className={styles.container}>
					<header className={styles.hero}>
						<h1 className={styles.title}>Terms of Service</h1>
						<p className={styles.lastUpdated}>Last updated: {LAST_UPDATED}</p>
						<PageLinks />
					</header>
					<article>
						<ol className={styles.legalList}>
							<li>
								<h2>1. Acceptance</h2>
								<p>By using Joseph OAuth, Travel Split, or English Word Cards, you agree to these Terms of Service.</p>
							</li>
							<li>
								<h2>2. Applications Covered</h2>
								<p>These terms apply to Joseph OAuth, Travel Split, and English Word Cards.</p>
							</li>
							<li>
								<h2>3. Personal Use</h2>
								<p>The applications are provided for personal, non-commercial use.</p>
							</li>
							<li>
								<h2>4. Accounts</h2>
								<p>
									Joseph OAuth provides Google Sign-In for the supported applications. You are responsible for your
									account access and activity.
								</p>
							</li>
							<li>
								<h2>5. User Content</h2>
								<p>
									You are responsible for expenses, vocabulary, notes, definitions, and other content you create or
									save in the applications.
								</p>
							</li>
							<li>
								<h2>6. Acceptable Use</h2>
								<p>
									You may not abuse, disrupt, reverse engineer, or attempt to gain unauthorized access to the
									applications or related systems.
								</p>
							</li>
							<li>
								<h2>7. Availability</h2>
								<p>
									The services may change, break, be interrupted, or be discontinued. There is no guarantee of data
									persistence.
								</p>
							</li>
							<li>
								<h2>8. Third-Party Services</h2>
								<p>
									The applications may use Google Sign-In and third-party cloud services for authentication,
									hosting, storage, or operation.
								</p>
							</li>
							<li>
								<h2>9. Disclaimer</h2>
								<p>The applications are provided on an as-is basis.</p>
								<p>
									Travel Split calculations are not guaranteed to be accurate, complete, or suitable for financial
									decisions.
								</p>
								<p>
									English Word Cards content, definitions, notes, and review behavior are not guaranteed to be
									accurate or complete.
								</p>
							</li>
							<li>
								<h2>10. Liability</h2>
								<p>
									Use the applications at your own discretion. Joseph Tseng is not responsible for losses caused by
									use of, inability to use, or reliance on the applications.
								</p>
							</li>
							<li>
								<h2>11. Termination</h2>
								<p>Access may be limited or ended if an application is misused or discontinued.</p>
							</li>
							<li>
								<h2>12. Changes</h2>
								<p>
									These terms may be updated as the applications change. Updates will be reflected by the last
									updated date on this page.
								</p>
							</li>
							<li>
								<h2>13. Contact</h2>
								<p>Contact: {CONTACT_EMAIL}</p>
							</li>
						</ol>
					</article>
				</div>
			</main>
			<PageFooter />
		</>
	);
}
