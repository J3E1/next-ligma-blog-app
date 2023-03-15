import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	increment,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth } from '../../libs/firebaseConfig';
import Loader from './Loader';

type Props = { postRef: DocumentReference };
export default function HeartButton({ postRef }: Props) {
	// const [heartDoc, setHeartDoc] =
	// 	useState<DocumentSnapshot<DocumentData> | null>(null);
	const [loading, setLoading] = useState(false);
	const heartRef = doc(
		collection(postRef, 'hearts'),
		auth.currentUser?.uid as string
	);
	// getDoc(heartRef).then(data => setHeartDoc(data));
	const [heartDoc] = useDocument(heartRef);
	const uid = auth.currentUser?.uid;

	const addLike = async () => {
		setLoading(true);
		await updateDoc(postRef, { heartCount: increment(1) });
		await setDoc(heartRef, { uid });
		setLoading(false);
	};
	const removeLike = async () => {
		setLoading(true);
		await updateDoc(postRef, { heartCount: increment(-1) });
		await deleteDoc(heartRef);
		setLoading(false);
	};

	return !heartDoc?.exists() ? (
		<button
			className='btn btn-sm sm:btn-md btn-secondary rounded-sm w-full'
			onClick={addLike}>
			{loading ? <Loader className='h-6 w-6' show /> : '💗 Like this Post'}
		</button>
	) : (
		<button
			className='btn btn-sm sm:btn-md btn-secondary rounded-sm w-full'
			onClick={removeLike}>
			{loading ? <Loader className='h-6 w-6' show /> : '💔 Unlike this Post'}
		</button>
	);
}
