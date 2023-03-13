import { getApps, initializeApp } from 'firebase/app';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import UserContext from '../../libs/context';
import { auth, firebaseConfig, firestore } from '../../libs/firebaseConfig';

type Props = {};
export default function UserNameForm({}: Props) {
	const [formValue, setFormValue] = useState<string>('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({ message: '', red: false });
	const { user, setUsername, setUsernameInFirestore } = useContext(UserContext);

	const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	const checkUserName = useCallback(async (userName: string) => {
		if (userName.length >= 3) {
			const docRef = doc(firestore, 'username', userName);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				setMessage({ message: 'Username already taken', red: true });
			} else {
				setMessage({ message: 'Username is availabe', red: false });
			}
			setIsValid(!docSnapshot.exists());
			setLoading(false);

			console.log('🚀 ~ file: UserNameForm.tsx:24 ~ checkUserName ~');
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			checkUserName(formValue);
		}, 500);
		return () => clearTimeout(timer);
	}, [formValue, checkUserName]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setIsValid(false);
		setLoading(true);

		const val = e.target.value.toLowerCase().trim();
		if (val.length < 3) {
			setLoading(false);
			setMessage({
				message: 'Username must be at least 3 characters',
				red: true,
			});
		}
		if (re.test(val)) {
			setLoading(true);
		}
		setFormValue(val);
	};
	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await setUsernameInFirestore(formValue);
	};

	return (
		<section>
			<h3 className='text-xl'>Choose Username</h3>
			<form onSubmit={formSubmitHandler}>
				<div className='flex items-center my-6'>
					<input
						type='text'
						name='username'
						placeholder='Enter Username'
						value={formValue}
						onChange={inputChangeHandler}
						className='input input-ghost w-full max-w-xs rounded-none h-10'
					/>
					<button
						className='btn btn-sm sm:btn-md btn-accent rounded-sm ml-1'
						disabled={!isValid}>
						Choose
					</button>
				</div>
				{USernameMessage(loading, message.message, message.red)}
				<h3 className='text-lg'>Debug State</h3>
				<div>
					<h4>Username: {formValue}</h4>
					<h4>Loading: {loading.toString()}</h4>
					<h4>Username is valid: {isValid.toString()}</h4>
				</div>
			</form>
		</section>
	);
}
function USernameMessage(loading: boolean, message: string, red: boolean) {
	if (loading)
		return (
			<p className='my-4 font-semibold text-base text-green-500'>Checking..</p>
		);
	else
		return (
			message.length > 0 && (
				<p
					className={`my-4 font-semibold text-base ${
						red ? 'text-red-500' : 'text-green-500'
					}`}>
					{message}
				</p>
			)
		);
}
