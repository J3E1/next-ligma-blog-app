import { signOut } from '@firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../libs/firebaseConfig';

type Props = {};
export default function SignOutButton({}: Props) {
	const router = useRouter();
	const signOutFun = async () => {
		try {
			const res = await signOut(auth);
			router.push('/');
		} catch (error) {
			console.log('🚀 ~ file: index.tsx:20 ~ signInWithGoogle ~ error:', error);
		}
	};
	return (
		<button
			className='btn btn-sm sm:btn-md btn-primary rounded-sm'
			onClick={signOutFun}>
			Sign Out
		</button>
	);
}
