import { doc } from '@firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import UserContext from './context';
import { auth, firestore } from './firebaseConfig';

const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
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
					toast.success('Choose a unique Username');
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
		setLoading(false);
	};

	return (
		<UserContext.Provider
			value={{ user, username, loading, setUsername, setUsernameInFirestore }}>
			{children}
		</UserContext.Provider>
	);
};
export default UserProvider;
