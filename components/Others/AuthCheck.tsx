import Link from 'next/link';
import { ReactNode, useContext } from 'react';
import UserContext from '../../libs/context';

type Props = { children: ReactNode; fallback?: JSX.Element };
export default function AuthCheck({ children, fallback }: Props) {
	const { username } = useContext(UserContext);
	return username ? (
		<>{children}</>
	) : (
		fallback ?? (
			<Link href='/enter' className='text-lg'>
				You must be signed in
			</Link>
		)
	);
}
