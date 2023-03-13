import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
} from 'firebase/firestore';
import { useState } from 'react';
import { auth, firestore } from '../../libs/firebaseConfig';
import { Post } from '../../types';
import PostFeed from './PostFeed';

type Props = {};
export default function PostList({}: Props) {
	const [posts, setPosts] = useState([] as Post[]);
	const uid = auth.currentUser?.uid as string;

	const userRef = collection(doc(firestore, 'users', uid), 'posts');
	// const postsRef = collection(userRef, 'posts');
	const q = query(userRef, orderBy('createdAt', 'asc'));
	getDocs(q)
		.then(posts => posts.docs.map(doc => doc.data()))
		.then(data => setPosts(data as Post[]));

	if (!posts) return <h1>Posts not found!</h1>;

	return (
		<>
			<h1 className='mb-4 text-2xl font-bold'>Manage Your Posts</h1>
			<PostFeed posts={posts} admin />
		</>
	);
}
