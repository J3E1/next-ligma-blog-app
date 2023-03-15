import { orderBy, query } from '@firebase/firestore';
import { User } from 'firebase/auth';
import { collection, getDocs, limit, where } from 'firebase/firestore';
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

import PostFeed from '../../components/Post/PostFeed';
import UserProfile from '../../components/Layout/UserProfile';
import { auth, getUserByUsername, postToJSON } from '../../libs/firebaseConfig';
import { Post, UserFirestore } from '../../types';
import MetaTags from '../../components/Others/MetaTags';
import { useContext } from 'react';
import UserContext from '../../libs/context';

export default function UserProfilePage({
	posts,
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { username } = useContext(UserContext);

	const admin = user?.username === username;

	return (
		<>
			<MetaTags title={user?.username} />
			<main>
				<UserProfile user={user} admin={admin} />

				<PostFeed posts={posts} admin={admin} />
			</main>
		</>
	);
}

interface QueryParameters extends ParsedUrlQuery {
	username: string;
}
export const getServerSideProps: GetServerSideProps<{
	posts: Post[] | null;
	user: UserFirestore | null;
}> = async ({ query: params }: GetServerSidePropsContext) => {
	const { username } = params as QueryParameters;

	let posts: Post[] | null = null;
	let user: UserFirestore | null = null;

	const userDoc = await getUserByUsername(username);
	if (!userDoc) {
		return {
			notFound: true,
		};
	}
	user = userDoc.data() as UserFirestore;
	const usersRef = collection(userDoc.ref, 'posts');
	const q = query(
		usersRef,
		where('username', '==', username),
		orderBy('createdAt', 'desc'),
		limit(5)
	);
	posts = (await getDocs(q)).docs.map(postToJSON) as Post[];

	return {
		props: {
			user,
			posts,
		},
	};
};
