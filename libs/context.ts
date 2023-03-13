import { User } from 'firebase/auth';
import { createContext } from 'react';

const UserContext = createContext(
	{} as {
		user: User | null;
		username: string | null;
		loading: boolean;
		setUsername: (value: string) => void;
		setUsernameInFirestore: (username: string) => Promise<void>;
	}
);

export default UserContext;
