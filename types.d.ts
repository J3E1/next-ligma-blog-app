import { Timestamp } from 'firebase/firestore';

type Post = {
	title: string;
	content: string;
	published: boolean;
	slug: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	heartCount: number;
	uid: string;
	username: string;
};

type UserFirestore = {
	displayName: string;
	photoURL: string;
	username: string;
	email: string;
};
