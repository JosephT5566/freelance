'use client';

import type { ReactNode } from 'react';
import Header from '../views/layout/Header';
import Footer from '../views/layout/Footer';

export default function AppShell({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
