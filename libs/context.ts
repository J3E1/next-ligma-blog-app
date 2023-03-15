import { User } from 'firebase/auth';
import { createContext } from 'react';

const UserContext = createContext(
	{} as {
		user: User | null;
		username: string | null;
		loading: boolean;
		setUsername: (value: string) => void;
		setUsernameInFirestore: (username: string) => Promise<void>;
		createPostInFireStore: (slug: string, title: string) => Promise<void>;
		setLoading: (value: boolean) => void;
	}
);

export default UserContext;
