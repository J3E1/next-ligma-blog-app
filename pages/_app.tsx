import '../styles/globals.css';
import type { AppProps } from 'next/app';

import UserProvider from '../libs/UserProvider';

import Layout from '../components/Layout/Layout';
import NavBar from '../components/UI/NavBar';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Drawer from '../components/Layout/Drawer';

const inter = Roboto({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			{/* <Layout> */}
			{/* <Drawer> */}
			<main className={`${inter.className}`}>
				<NavBar />
				<div className='bg-base-200'>
					<div className='container mx-auto min-h-[calc(100vh-4rem-1px)] px-2 py-8'>
						<Component {...pageProps} />
					</div>
				</div>
			</main>
			{/* </Drawer> */}
			<Toaster />
			{/* </Layout> */}
		</UserProvider>
	);
}
