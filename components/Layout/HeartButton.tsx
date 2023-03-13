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

type Props = { postRef: DocumentReference };
export default function HeartButton({ postRef }: Props) {
	// const [heartDoc, setHeartDoc] =
	// 	useState<DocumentSnapshot<DocumentData> | null>(null);
	const heartRef = doc(
		collection(postRef, 'hearts'),
		auth.currentUser?.uid as string
	);
	// getDoc(heartRef).then(data => setHeartDoc(data));
	const [heartDoc] = useDocument(heartRef);
	const uid = auth.currentUser?.uid;

	const addLike = async () => {
		await updateDoc(postRef, { heartCount: increment(1) });
		await setDoc(heartRef, { uid });
	};
	const removeLike = async () => {
		await updateDoc(postRef, { heartCount: increment(-1) });
		await deleteDoc(heartRef);
	};

	return !heartDoc?.exists() ? (
		<button
			className='btn btn-sm sm:btn-md btn-secondary rounded-sm w-full'
			onClick={addLike}>
			💗 Like this Post
		</button>
	) : (
		<button
			className='btn btn-sm sm:btn-md btn-secondary rounded-sm w-full'
			onClick={removeLike}>
			💔 Unlike this Post
		</button>
	);
}
