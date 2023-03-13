import { Roboto } from 'next/font/google';
import { ReactNode, useContext } from 'react';
import UserContext from '../../libs/context';
import NavBar from '../UI/NavBar';
import SeconderyLoader from './SeconderyLoader';

const inter = Roboto({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-inter',
});

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
	const { loading } = useContext(UserContext);
	return (
		<>
			{loading ? (
				<SeconderyLoader />
			) : (
				<main className={`${inter.className} container mx-auto`}>
					<NavBar />
					<div className='px-2 pt-8'>{children}</div>
				</main>
			)}
		</>
	);
}
