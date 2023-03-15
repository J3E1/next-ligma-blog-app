import { doc } from '@firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
	collection,
	getDoc,
	serverTimestamp,
	setDoc,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Post } from '../types';
import UserContext from './context';
import { auth, firestore } from './firebaseConfig';

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	// const router = useRouter();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				const userRef = doc(firestore, 'users', user.uid);
				const userDoc = await getDoc(userRef);
				if (!userDoc.exists()) {
					await setDoc(userRef, {
						email: user.email || 'Anonymous',
						displayName: user.displayName || 'Anonymous',
						photoURL:
							user.photoURL ||
							'https://i.pinimg.com/originals/23/77/e6/2377e6d852d6b2e9d537924f5ec40f71.jpg',
					});
					toast('Choose a unique Username');
				}

				const userData = userDoc.data();
				if (userData?.username) {
					setUsername(userData.username);
				}
				setUser(user);
			} else {
				setUser(null);
				setUsername(null);
			}
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const setUsernameInFirestore = async (username: string) => {
		if (!user?.uid) {
			console.log('User not found!!');
			return;
		}
		setLoading(true);
		const userRef = doc(firestore, 'users', user?.uid);

		await updateDoc(userRef, { username: username })
			.then(() => {
				setUsername(username);
			})
			.catch(error => {
				console.error('Error adding username: ', error);
			});

		const usernameRef = doc(firestore, 'username', username);

		await setDoc(usernameRef, { uid: user?.uid });
		toast.success('Signed In Successfully');
		setLoading(false);
	};

	const createPostInFireStore = async (slug: string, title: string) => {
		setLoading(true);
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
			})
			.catch(e => toast.error('Something went wrong!'));
		setLoading(false);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				username,
				loading,
				setUsername,
				setUsernameInFirestore,
				createPostInFireStore,
				setLoading,
			}}>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
