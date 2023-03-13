import {
	collection,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	Timestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-hot-toast';
import UserContext from '../../libs/context';
import { auth, firestore } from '../../libs/firebaseConfig';
import { Post } from '../../types';

type Props = {};
export default function CreateNewPost({}: Props) {
	const router = useRouter();
	const { username } = useContext(UserContext);
	const [title, setTitle] = useState('');
	const [isValid, setIsValid] = useState(
		title.length > 3 && title.length < 100
	);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<{
		message: string;
		color: 'red' | 'green';
	}>({
		message: '',
		color: 'red',
	});

	const slug = encodeURI(toKababCase(title));

	const checkPostslug = useCallback(async (slug: string) => {
		if (slug.length >= 3) {
			const uid = auth.currentUser?.uid as string;

			const userRef = collection(doc(firestore, 'users', uid), 'posts');
			const docRef = doc(userRef, slug);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				setMessage({ message: 'Title is already taken', color: 'red' });
			} else {
				setMessage({ message: 'Title is availabe', color: 'green' });
			}
			setIsValid(!docSnapshot.exists());
			setLoading(false);

			console.log('🚀 ~ file: UserNameForm.tsx:24 ~ checkPostslug ~');
		}
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			checkPostslug(slug);
		}, 500);
		return () => clearTimeout(timer);
	}, [slug, checkPostslug]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setIsValid(false);
		setLoading(true);

		const val = e.target.value;
		if (val.length < 3) {
			setMessage({
				message: 'Title must be at least 3 characters',
				color: 'red',
			});
		}
		setLoading(false);

		setTitle(val);
	};

	const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const uid = auth.currentUser?.uid as string;

		const userRef = collection(doc(firestore, 'users', uid), 'posts');

		const postRef = doc(userRef, slug);

		const data: Post = {
			uid,
			username: username as string,
			title,
			slug,
			heartCount: 0,
			createdAt: serverTimestamp() as Timestamp,
			updatedAt: serverTimestamp() as Timestamp,
			published: false,
			content: '# Hello',
		};
		await setDoc(postRef, data)
			.then(() => {
				toast.success('Post Created');
				router.push(`/admin/${slug}`);
			})
			.catch(e => toast.error('Something went wrong!'));
	};

	return (
		<form
			className='shadow-xl rounded-sm bg-base-100 px-10 py-8'
			onSubmit={formSubmitHandler}>
			<input
				className='input input-ghost w-full rounded-none h-10 '
				type='text'
				placeholder='Enter a Title for Your Article !'
				onChange={inputChangeHandler}
				value={title}
			/>
			<p className='my-4 text-base'>
				Slug: <span className='font-semibold'>{slug}</span>
			</p>
			{SlugMessage(loading, message.message, message.color === 'red')}
			<button
				className='btn btn-sm sm:btn-md btn-accent rounded-sm ml-1 w-full'
				disabled={!isValid}>
				Create New Post
			</button>
		</form>
	);
}
function toKababCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[^a-zA-Z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.toLowerCase();
}
function SlugMessage(loading: boolean, message: string, red: boolean) {
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
