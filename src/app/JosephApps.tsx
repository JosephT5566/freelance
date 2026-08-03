import Link from 'next/link';

const CONTACT_EMAIL = 'zxp930110gg@gmail.com';

const signInSteps = [
	{
		label: 'Supported app',
		text: 'A user chooses Google Sign-In from Travel Split or English Word Cards.',
	},
	{
		label: 'Google consent',
		text: 'Joseph Apps sends the user to Google and validates the authorization response.',
	},
	{
		label: 'Secure session',
		text: 'The service creates the session needed to identify the user safely.',
	},
	{
		label: 'Return to app',
		text: 'The user returns to the app, which can make authenticated requests for its own features.',
	},
];

const supportedApps = [
	{
		name: 'Travel Split',
		purpose:
			'A mobile-first trip expense app and travel-book companion that uses a Google Sheet as its application data source.',
		signIn:
			'Google Sign-In identifies trip members and allows authenticated expense and trip-configuration requests.',
		data:
			'App data includes trip users, expenses, categories, currencies, dates, balances, and travel resources. The app does not request access to a user’s personal Google Drive files.',
	},
	{
		name: 'English Word Cards',
		purpose:
			'A personal English review app for daily vocabulary practice with swipe cards and spaced-repetition scheduling.',
		signIn:
			'Google Sign-In identifies the learner and authorizes review updates sent to the application backend.',
		data:
			'App data includes vocabulary, review stage, next review date, and session progress. The app does not request access to a user’s Gmail, Drive files, Calendar, or Contacts.',
	},
];

export default function JosephApps() {
	return (
		<>
			<main className="min-h-screen bg-[#f1ece8] px-4 pt-26 pb-14 text-[#254251] sm:px-6 sm:pt-30 sm:pb-20">
				<div className="mx-auto w-full max-w-[1120px]">
					<Link
						className="mb-10 inline-flex items-center gap-2 text-[0.82rem] font-bold tracking-[0.06em] uppercase transition-colors duration-200 hover:text-[#f04b00] focus-visible:text-[#f04b00] focus-visible:outline-none motion-reduce:transition-none sm:mb-14"
						href="/projects"
					>
						<span aria-hidden="true">←</span> All projects
					</Link>

					<header className="grid items-end gap-10 pb-16 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.75fr)] lg:gap-[clamp(2rem,6vw,6rem)] lg:pb-20">
						<div>
							<p className="mb-3 text-[0.78rem] font-bold tracking-[0.1em] text-[#f04b00] uppercase">
								Authentication service
							</p>
							<h1 className="m-0 font-[Vidaloka,serif] text-[clamp(3.75rem,21vw,6.5rem)] leading-[0.82] font-normal tracking-[-0.035em] lg:text-[clamp(4rem,10vw,8.5rem)]">
								Joseph Apps
							</h1>
							<p className="mt-8 max-w-[720px] text-[clamp(1.08rem,2vw,1.28rem)] leading-[1.75]">
								Joseph Apps is the shared sign-in service for applications operated by Joseph Tseng. It lets the
								supported applications below use Google Sign-In, creates secure sessions, and routes authenticated
								requests to the appropriate application backend.
							</p>
							<p className="mt-5 max-w-[690px] border-l-[3px] border-[#f04b00] pl-4 text-[0.92rem] leading-[1.65]">
								Joseph Apps is independently operated and is not affiliated with or endorsed by Google.
							</p>
						</div>

						<dl
							className="relative mb-2 max-w-[520px] bg-[#254251] p-7 text-[#f1ece8] shadow-[0.65rem_0.65rem_0_#f04b00] lg:max-w-none"
							aria-label="Application identity"
						>
							<div>
								<dt className="mb-1 text-[0.68rem] font-bold tracking-[0.09em] text-[#b7c9cf] uppercase">
									OAuth application name
								</dt>
								<dd className="m-0 text-base leading-[1.4] font-bold">Joseph Apps</dd>
							</div>
							<div className="mt-6 border-t border-[#f1ece8]/25 pt-6">
								<dt className="mb-1 text-[0.68rem] font-bold tracking-[0.09em] text-[#b7c9cf] uppercase">
									Operator
								</dt>
								<dd className="m-0 text-base leading-[1.4] font-bold">Joseph Tseng</dd>
							</div>
							<div className="mt-6 border-t border-[#f1ece8]/25 pt-6">
								<dt className="mb-1 text-[0.68rem] font-bold tracking-[0.09em] text-[#b7c9cf] uppercase">
									Purpose
								</dt>
								<dd className="m-0 text-base leading-[1.4] font-bold">Authentication and secure app sessions</dd>
							</div>
						</dl>
					</header>

					<section className="border-t border-[#254251]/20 py-14 sm:py-18" aria-labelledby="sign-in-flow-title">
						<p className="mb-3 text-[0.78rem] font-bold tracking-[0.1em] text-[#f04b00] uppercase">Sign-in flow</p>
						<h2
							className="m-0 max-w-[760px] font-[Vidaloka,serif] text-[clamp(2.35rem,6vw,4.5rem)] leading-[0.96] font-normal"
							id="sign-in-flow-title"
						>
							How Joseph Apps works
						</h2>
						<div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
							{signInSteps.map((step, index) => (
								<article
									className="relative border border-[#254251]/20 bg-white/25 p-6 lg:min-h-[230px] lg:not-last:border-r-0"
									key={step.label}
								>
									<span className="font-[Montserrat,sans-serif] text-xs font-bold tracking-[0.08em] text-[#829da9]">
										{String(index + 1).padStart(2, '0')}
									</span>
									<h3 className="mt-8 mb-3 font-[Vidaloka,serif] text-2xl font-normal lg:mt-14">
										{step.label}
									</h3>
									<p className="m-0 leading-[1.7]">{step.text}</p>
									{index < signInSteps.length - 1 && (
										<span
											className="absolute top-4 -right-3 z-10 hidden size-6 place-items-center rounded-full bg-[#f04b00] text-sm text-white lg:grid"
											aria-hidden="true"
										>
											→
										</span>
									)}
								</article>
							))}
						</div>
					</section>

					<section className="border-t border-[#254251]/20 py-14 sm:py-18" aria-labelledby="google-data-title">
						<p className="mb-3 text-[0.78rem] font-bold tracking-[0.1em] text-[#f04b00] uppercase">
							Google data usage
						</p>
						<h2
							className="m-0 max-w-[760px] font-[Vidaloka,serif] text-[clamp(2.35rem,6vw,4.5rem)] leading-[0.96] font-normal"
							id="google-data-title"
						>
							What the service requests
						</h2>
						<div className="mt-12 grid gap-4 md:grid-cols-2">
							<article className="border border-[#254251]/20 bg-white/30 p-7 md:min-h-[215px]">
								<h3 className="mb-4 font-[Vidaloka,serif] text-[1.75rem] leading-[1.1] font-normal">
									Basic account information
								</h3>
								<ul className="m-0 list-disc pl-5 leading-[1.85]">
									<li>Google account identifier through OpenID</li>
									<li>Email address</li>
									<li>Name and profile image</li>
								</ul>
							</article>
							<article className="border border-[#254251]/20 bg-white/30 p-7 md:min-h-[215px]">
								<h3 className="mb-4 font-[Vidaloka,serif] text-[1.75rem] leading-[1.1] font-normal">How it is used</h3>
								<p className="m-0 leading-[1.7]">
									This information identifies the user, associates the correct application records with that
									account, and displays basic profile details inside a supported app.
								</p>
							</article>
							<article className="border border-[#254251]/20 bg-white/30 p-7 md:min-h-[215px]">
								<h3 className="mb-4 font-[Vidaloka,serif] text-[1.75rem] leading-[1.1] font-normal">
									Additional app access
								</h3>
								<p className="m-0 leading-[1.7]">
									When required by a supported app, Joseph Apps may request the Google permission shown on the
									consent screen to call that app&apos;s Google Apps Script backend.
								</p>
							</article>
							<article className="border border-[#f04b00] bg-white/30 p-7 md:min-h-[215px]">
								<h3 className="mb-4 font-[Vidaloka,serif] text-[1.75rem] leading-[1.1] font-normal">
									What it does not access
								</h3>
								<p className="m-0 leading-[1.7]">
									Joseph Apps does not request a Google password or access Gmail, personal Drive files, Google
									Calendar, or Contacts.
								</p>
							</article>
						</div>
					</section>

					<section className="border-t border-[#254251]/20 py-14 sm:py-18" aria-labelledby="supported-apps-title">
						<p className="mb-3 text-[0.78rem] font-bold tracking-[0.1em] text-[#f04b00] uppercase">
							Current application list
						</p>
						<h2
							className="m-0 max-w-[760px] font-[Vidaloka,serif] text-[clamp(2.35rem,6vw,4.5rem)] leading-[0.96] font-normal"
							id="supported-apps-title"
						>
							Supported applications
						</h2>
						<p className="mt-5 max-w-[640px] text-[1.05rem] leading-[1.7]">
							Joseph Apps currently supports only the applications listed here.
						</p>
						<div className="mt-12 grid gap-5">
							{supportedApps.map((app) => (
								<article
									className="grid gap-8 border-t-2 border-[#254251] py-8 md:grid-cols-2 lg:grid-cols-[0.7fr_repeat(3,minmax(0,1fr))]"
									key={app.name}
								>
									<h3 className="m-0 font-[Vidaloka,serif] text-[1.75rem] leading-[1.1] font-normal">{app.name}</h3>
									<div>
										<strong className="mb-3 block text-xs tracking-[0.08em] text-[#f04b00] uppercase">What it does</strong>
										<p className="m-0 leading-[1.7]">{app.purpose}</p>
									</div>
									<div>
										<strong className="mb-3 block text-xs tracking-[0.08em] text-[#f04b00] uppercase">
											Why it uses Joseph Apps
										</strong>
										<p className="m-0 leading-[1.7]">{app.signIn}</p>
									</div>
									<div>
										<strong className="mb-3 block text-xs tracking-[0.08em] text-[#f04b00] uppercase">Application data</strong>
										<p className="m-0 leading-[1.7]">{app.data}</p>
									</div>
								</article>
							))}
						</div>
					</section>

					<section
						className="grid gap-10 border-t border-[#254251]/20 py-14 sm:py-18 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-[clamp(2rem,7vw,7rem)]"
						aria-labelledby="security-title"
					>
						<div>
							<p className="mb-3 text-[0.78rem] font-bold tracking-[0.1em] text-[#f04b00] uppercase">
								Security and control
							</p>
							<h2
								className="m-0 max-w-[760px] font-[Vidaloka,serif] text-[clamp(2.35rem,6vw,4.5rem)] leading-[0.96] font-normal"
								id="security-title"
							>
								How sessions are protected
							</h2>
						</div>
						<ul className="m-0 grid list-none p-0">
							<li className="border-t border-[#254251]/20 py-4 leading-[1.65]">Redirects are limited to configured application origins.</li>
							<li className="border-t border-[#254251]/20 py-4 leading-[1.65]">
								OAuth state records are short-lived and validated during callback.
							</li>
							<li className="border-t border-[#254251]/20 py-4 leading-[1.65]">
								Sessions use HttpOnly cookies and server-side Cloudflare KV records.
							</li>
							<li className="border-t border-[#254251]/20 py-4 leading-[1.65]">
								Personal data is not sold or used for advertising tracking.
							</li>
							<li className="border-y border-[#254251]/20 py-4 leading-[1.65]">
								Users can request data deletion by contacting the operator.
							</li>
						</ul>
					</section>

					<section
						className="grid items-end gap-8 border-t border-[#254251]/20 pt-14 pb-4 sm:pt-18 lg:grid-cols-[minmax(0,1fr)_auto]"
						aria-labelledby="policies-title"
					>
						<div>
							<p className="mb-3 text-[0.78rem] font-bold tracking-[0.1em] text-[#f04b00] uppercase">
								Policies and support
							</p>
							<h2
								className="m-0 max-w-[760px] font-[Vidaloka,serif] text-[clamp(2.35rem,6vw,4.5rem)] leading-[0.96] font-normal"
								id="policies-title"
							>
								Review or get in touch
							</h2>
						</div>
						<nav className="flex flex-wrap gap-3 lg:justify-end" aria-label="Joseph Apps policy links">
							<Link
								className="inline-flex min-h-11 items-center border border-[#254251]/35 px-4 py-2 font-bold transition-colors duration-200 hover:border-[#f04b00] hover:bg-white/30 hover:text-[#f04b00] focus-visible:border-[#f04b00] focus-visible:bg-white/30 focus-visible:text-[#f04b00] focus-visible:outline-none motion-reduce:transition-none"
								href="/privacy"
							>
								Privacy policy
							</Link>
							<Link
								className="inline-flex min-h-11 items-center border border-[#254251]/35 px-4 py-2 font-bold transition-colors duration-200 hover:border-[#f04b00] hover:bg-white/30 hover:text-[#f04b00] focus-visible:border-[#f04b00] focus-visible:bg-white/30 focus-visible:text-[#f04b00] focus-visible:outline-none motion-reduce:transition-none"
								href="/terms"
							>
								Terms of service
							</Link>
							<a
								className="inline-flex min-h-11 items-center border border-[#254251]/35 px-4 py-2 font-bold transition-colors duration-200 hover:border-[#f04b00] hover:bg-white/30 hover:text-[#f04b00] focus-visible:border-[#f04b00] focus-visible:bg-white/30 focus-visible:text-[#f04b00] focus-visible:outline-none motion-reduce:transition-none"
								href={`mailto:${CONTACT_EMAIL}`}
							>
								Contact Joseph Tseng
							</a>
						</nav>
					</section>
				</div>
			</main>
			<footer className="flex justify-center bg-[#f1ece8] px-4 pt-8 pb-12 text-[#829da9]">© 2026 Joseph Tseng</footer>
		</>
	);
}
