import Image from 'next/image';
import Link from 'next/link';
import {
	DetailedHTMLProps,
	HTMLAttributes,
	ReactNode,
	useContext,
} from 'react';
import UserContext from '../../libs/context';
import ThemeChanger from '../Layout/ThemeChanger';
import SignOutButton from './SignOutButton';

interface Props
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
export default function NavBar({ className }: Props) {
	const { user, username, loading } = useContext(UserContext);
	return (
		<header className='border-slate-200 border-b '>
			<nav className='navbar container mx-auto'>
				<div className='flex-1 gap-2'>
					<Link
						href='/'
						className='btn btn-sm sm:btn-md normal-case rounded-sm'>
						LIGMA
					</Link>
					<ThemeChanger />
				</div>
				<div className='flex-none gap-1 sm:gap-4 items-center'>
					{username && (
						<>
							<Link
								href={`/${username}`}
								className='btn btn-sm sm:btn-md btn-ghost btn-circle avatar'>
								<Image
									alt='Profile Photo'
									src={
										user?.photoURL ||
										'https://i.pinimg.com/originals/23/77/e6/2377e6d852d6b2e9d537924f5ec40f71.jpg'
									}
									height={100}
									width={100}
									className='h-12 w-12 cursor-pointer rounded-full'
									priority
								/>
							</Link>
							{/* <label
							htmlFor='my-drawer'
							className='btn btn-sm sm:btn-md btn-ghost btn-circle avatar'>
							<Image
								alt='Profile Photo'
								src={
									user?.photoURL ||
									'https://i.pinimg.com/originals/23/77/e6/2377e6d852d6b2e9d537924f5ec40f71.jpg'
								}
								height={100}
								width={100}
								className='h-12 w-12 cursor-pointer rounded-full'
								priority
							/>
						</label> */}
						</>
					)}
					{!username && (
						<Link
							href='/enter'
							className='btn btn-sm sm:btn-md btn-primary rounded-sm'>
							Sign In
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
