import {
	collectionGroup,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	Timestamp,
	where,
} from 'firebase/firestore';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Loader from '../components/Layout/Loader';
import MetaTags from '../components/Others/MetaTags';
import PostFeed from '../components/Post/PostFeed';
import { firestore, postToJSON } from '../libs/firebaseConfig';
import { Post } from '../types';

export default function Home({
	posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [displayedPosts, setDisplayedPosts] = useState<Post[] | null>(posts);
	const [loading, setLoading] = useState(false);
	const [postsEnd, setPostsEnd] = useState(false);

	const getMorePosts = async () => {
		setLoading(true);
		if (!displayedPosts) return null;
		const lastPost = displayedPosts[displayedPosts.length - 1];
		const current =
			typeof lastPost.createdAt === 'number'
				? Timestamp.fromMillis(lastPost.createdAt)
				: lastPost.createdAt;
		const postsRef = collectionGroup(firestore, 'posts');
		const q = query(
			postsRef,
			where('published', '==', true),
			orderBy('createdAt', 'desc'),
			startAfter(current),
			limit(LIMIT_OF_POSTS_PER_PAGE)
		);
		const newPosts = (await getDocs(q)).docs.map(postToJSON) as Post[];

		setDisplayedPosts(prevPosts => prevPosts && prevPosts?.concat(newPosts));
		setLoading(false);

		if (newPosts.length < LIMIT_OF_POSTS_PER_PAGE) {
			setPostsEnd(true);
		}
	};

	return (
		<>
			<MetaTags />
			<main>
				<PostFeed posts={displayedPosts} />

				{!loading && !postsEnd && (
					<button
						className='btn-sm sm:btn-md btn-info rounded-sm'
						onClick={getMorePosts}>
						Load more posts
					</button>
				)}

				<Loader show={loading} />

				{postsEnd && <h2>You have reaced the end!</h2>}
			</main>
		</>
	);
}
const LIMIT_OF_POSTS_PER_PAGE = 5;

export const getServerSideProps: GetServerSideProps<{
	posts: Post[] | null;
}> = async () => {
	const postsRef = collectionGroup(firestore, 'posts');
	const q = query(
		postsRef,
		where('published', '==', true),
		orderBy('updatedAt', 'desc'),
		limit(LIMIT_OF_POSTS_PER_PAGE)
	);
	const postsData = await getDocs(q);
	const posts = postsData.docs.map(postToJSON) as Post[];

	return {
		props: {
			posts,
		},
	};
};
