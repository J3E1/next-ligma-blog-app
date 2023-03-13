import { signInWithPopup, signInAnonymously } from 'firebase/auth';
import { auth, googleProvider } from '../../libs/firebaseConfig';

const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		console.log('🚀 ~ file: index.tsx:18 ~ signInWithGoogle ~ res:', res);
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:20 ~ signInWithGoogle ~ error:', error);
	}
};

type Props = {};
export default function SignInWithGoogleButton({}: Props) {
	return (
		<>
			<button
				className='btn btn-sm sm:btn-md btn-outline flex items-center rounded-sm'
				onClick={signInWithGoogle}>
				<svg viewBox='0 0 488 512' fill='currentColor' className='h-4 w-4'>
					<path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
				</svg>
				<span className='ml-4'>SignIn with google</span>
			</button>
			<button
				className='btn btn-sm sm:btn-md btn-secondary flex items-center rounded-sm mt-8'
				onClick={() => signInAnonymously(auth)}>
				SignIn with Anonymously
			</button>
		</>
	);
}
