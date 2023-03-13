import { signOut } from '@firebase/auth';
import { auth } from '../../libs/firebaseConfig';

const signOutFun = async () => {
	try {
		const res = await signOut(auth);
	} catch (error) {
		console.log('🚀 ~ file: index.tsx:20 ~ signInWithGoogle ~ error:', error);
	}
};

type Props = {};
export default function SignOutButton({}: Props) {
	return (
		<button
			className='btn btn-sm sm:btn-md btn-primary rounded-sm'
			onClick={signOutFun}>
			Sign Out
		</button>
	);
}
