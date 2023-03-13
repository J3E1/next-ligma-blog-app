import { User } from 'firebase/auth';
import Image from 'next/image';
import { UserFirestore } from '../../types';

type Props = { user: UserFirestore | null };
export default function UserProfile({ user }: Props) {
	return (
		<div className='card bg-base-100 shadow-md mb-8 rounded-sm items-center text-center'>
			<div className='card-body items-center'>
				{/* // <div className='w-full flex flex-col justify-center items-center'> */}
				<Image
					alt='Profile Photo'
					src={
						user?.photoURL ||
						'https://i.pinimg.com/originals/23/77/e6/2377e6d852d6b2e9d537924f5ec40f71.jpg'
					}
					height={250}
					width={250}
					className=' h-32 w-32 rounded-full'
					priority
				/>
				<p className='mt-4 text-lg'>
					<i>@{user?.username}</i>
				</p>
				<h2 className='text-xl'>{user?.displayName}</h2>
			</div>
		</div>
	);
}
