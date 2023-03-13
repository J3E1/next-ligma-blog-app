import Image from 'next/image';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import MetaTags from '../components/Others/MetaTags';

type Props = {};
export default function ErrorPage({}: Props) {
	const router = useRouter();

	return (
		<>
			<MetaTags title='Not Found' />
			<div className='text-center'>
				<h1 className='text-4xl font-bold my-4'>404</h1>
				<p className='text-2xl font-semibold mb-4'>
					The page you tried to connect, It seems it does not exists!
				</p>

				<Image
					src='https://media.tenor.com/HL0T0zpVkbQAAAAd/my-honest-reaction-kumala-la.gif'
					alt='My Honest Reaction Kumala La GIF'
					width={350}
					height={350}
					className='mx-auto'
				/>

				<button
					onClick={() => router.replace('/')}
					className='btn btn-sm sm:btn-md btn-primary rounded-sm my-4'>
					Go Back to Home
				</button>
			</div>
		</>
	);
}
