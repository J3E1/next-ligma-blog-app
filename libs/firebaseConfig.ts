// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import {
	browserSessionPersistence,
	getAuth,
	GoogleAuthProvider,
	inMemoryPersistence,
	setPersistence,
} from 'firebase/auth';
import {
	collection,
	DocumentSnapshot,
	getDocs,
	getFirestore,
	limit,
	query,
	where,
	FieldValue,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: 'AIzaSyAfJhaegFlHcQKIL8Oy_2MS3Y6zVmqfm38',
	authDomain: 'next-blog-app-36e12.firebaseapp.com',
	projectId: 'next-blog-app-36e12',
	storageBucket: 'next-blog-app-36e12.appspot.com',
	messagingSenderId: '98388103789',
	appId: '1:98388103789:web:44da3331a99d704c0e2564',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);

if (!getApps().length) {
	initializeApp(firebaseConfig);
}

export const getUserByUsername = async (
	username: string
): Promise<DocumentSnapshot> => {
	const usersRef = collection(firestore, 'users');
	const q = query(usersRef, where('username', '==', username), limit(1));
	const snapshot = await getDocs(q);

	// if (snapshot.empty) {
	// 	throw new Error(`No user found with username: ${username}`);
	// }

	return snapshot.docs[0];
};

export const postToJSON = (post: DocumentSnapshot) => {
	const data = post.data();
	return {
		...data,
		createdAt: data?.createdAt.toMillis(),
		updatedAt: data?.updatedAt.toMillis(),
	};
};
