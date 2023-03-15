import {
	collection,
	collectionGroup,
	doc,
	DocumentData,
	DocumentReference,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import {
	InferGetStaticPropsType,
	GetStaticProps,
	GetStaticPropsContext,
	GetStaticPaths,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import PostContent from '../../components/Post/PostContent';
import {
	firestore,
	getUserByUsername,
	postToJSON,
} from '../../libs/firebaseConfig';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Post } from '../../types';

import MetaTags from '../../components/Others/MetaTags';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../libs/context';

import HeartButton from '../../components/Layout/HeartButton';
import Link from 'next/link';
import AuthCheck from '../../components/Others/AuthCheck';
import Loader from '../../components/Layout/Loader';

type Props = {};
export default function UserPostPage({
	post: defaultPost,
	path,
}: // postRef,
//
InferGetStaticPropsType<typeof getStaticProps>) {
	const [postRef, setPostRef] =
		useState<DocumentReference<DocumentData> | null>(null);
	const { user: currentUser } = useContext(UserContext);
	const [realtimePost] = useDocumentData(postRef);
	// console.log('🚀 ~ file: [slug].tsx:45 ~ path:', postRef);
	// const postRef = doc(firestore, path);
	useEffect(() => {
		setPostRef(doc(firestore, path));
	}, [path]);

	const post = (realtimePost as Post) || defaultPost;

	if (!post)
		return (
			<div className='flex justify-center'>
				<Loader show />
			</div>
		);

	return (
		<>
			<MetaTags title={post.title} />
			<div className='flex w-full flex-wrap mb-8'>
				<div className='grid flex-grow flex-shrink basis-[70%] min-w-[35ch] h-fit'>
					<section>
						<PostContent post={post} />
					</section>
				</div>

				<div className='flex-grow flex-shrink basis-[30%] min-w-[10ch] flex flex-col gap-4 items-center h-56 min-h-fit p-4 sticky top-0'>
					<span>💗 {post.heartCount || 0} Likes</span>
					<AuthCheck
						fallback={
							<Link href='/enter' className='text-lg'>
								Sign In to Like this Post
							</Link>
						}>
						{postRef && <HeartButton postRef={postRef} />}
					</AuthCheck>
					{currentUser?.uid === post.uid && (
						<Link
							href={`/admin/${post.slug}`}
							className='btn btn-sm sm:btn-md btn-primary rounded-sm w-full'>
							🎨 Edit
						</Link>
					)}
				</div>
			</div>
		</>
	);
	// return (
	// 	<main className='container'>
	// 		<PostContent post={post} markdownContent={markdownContent} />
	// 	</main>
	// );
}

interface Params extends ParsedUrlQuery {
	username: string;
	slug: string;
}
export const getStaticProps: GetStaticProps<{
	post: Post;
	path: string;
}> = async ({ params }: GetStaticPropsContext) => {
	const { username, slug } = params as Params;

	const userRef = await getUserByUsername(username);

	if (!userRef.exists()) {
		return {
			notFound: true,
		};
	}

	const postRef = doc(collection(userRef.ref, 'posts'), slug);
	const path = postRef.path;
	const postSnap = await getDoc(postRef);
	if (!postSnap.exists()) {
		return {
			notFound: true,
		};
	}

	const post = postToJSON(postSnap) as Post;
	// console.log('🚀 ~ file: [slug].tsx:127 ~ post:', post.createdAt);

	// const { data, content } = matter(fileName);

	return {
		props: {
			post: { ...post },
			path,
		},
		revalidate: 5000,
	};
};

export const getStaticPaths: GetStaticPaths = async (
	context: GetStaticPropsContext
) => {
	const docRef = collectionGroup(firestore, 'posts');
	const paths = (await getDocs(docRef)).docs.map(doc => {
		const { slug, username } = doc.data() as { slug: string; username: string };
		return {
			params: { username, slug },
		};
	});

	return {
		paths,
		fallback: false,
	};
};
