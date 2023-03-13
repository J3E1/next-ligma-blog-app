import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	DocumentReference,
	getDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { LegacyRef, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import md from 'markdown-it';
import { auth, firestore } from '../../libs/firebaseConfig';
import { Post } from '../../types';
import matter from 'gray-matter';
import Link from 'next/link';
import ImageUploader from '../Others/ImageUploader';
import UserContext from '../../libs/context';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import SeconderyLoader from '../Layout/SeconderyLoader';
import Loader from '../Layout/Loader';

type Props = {};
export default function PostManager({}: Props) {
	const [preview, setPreview] = useState(false);
	// const [post, setPost] = useState({} as Post);
	const { username, user } = useContext(UserContext);
	const router = useRouter();
	const { slug } = router.query as { slug: string };

	const uid = user?.uid as string;
	const userRef = collection(doc(firestore, 'users', uid), 'posts');
	const postRef = doc(userRef, slug);
	// getDoc(postRef).then(post => setPost(post.data() as Post));
	const [post] = useDocumentDataOnce(postRef);
	return (
		<>
			{!post || Object.keys(post).length === 0 ? (
				<div className='flex justify-center'>
					<Loader show />
				</div>
			) : (
				<div className='flex w-full flex-wrap'>
					<section className='grid flex-grow flex-shrink basis-[70%] min-w-[35ch] h-fit mb-8'>
						<h1 className='text-2xl my-2 font-semibold'>{post.title}</h1>
						<p className='text-md mb-2 opacity-75'>ID: {post.slug}</p>
						<PostForm
							defaultValues={post as Post}
							postRef={postRef}
							preview={preview}
						/>
					</section>

					<div className='flex-grow flex-shrink basis-[30%] min-w-[10ch] grid place-items-center bg-base-200 h-56 min-h-fit p-4 sticky top-0'>
						<div className='flex flex-col justify-center items-center gap-2 w-full'>
							<h2 className='text-xl font-bold'>Tools</h2>
							<button
								className='btn btn-sm sm:btn-md btn-primary rounded-sm w-full'
								onClick={() => setPreview(prev => !prev)}>
								{preview ? 'Edit' : 'Preview'}
							</button>
							<Link
								href={`/${post.username}/${post.slug}`}
								className='btn btn-sm sm:btn-md btn-secondary rounded-sm w-full'>
								Live View
							</Link>
							<button
								className='btn btn-sm sm:btn-md btn-warning rounded-sm w-full'
								onClick={() =>
									deleteDoc(postRef).then(
										() => {
											toast.success('Post Deleted Successfully');
											router.push(`/${username}`);
										},
										() => {
											toast.error('Something went wrong! Try Again');
										}
									)
								}>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
type PostFormProps = {
	defaultValues: Post;
	preview: boolean;
	postRef: DocumentReference<DocumentData>;
};
function PostForm({ defaultValues, postRef, preview }: PostFormProps) {
	const { register, handleSubmit, reset, watch, formState } = useForm({
		defaultValues,
		mode: 'onChange',
	});
	const { isDirty, isValid, errors } = formState;

	const updatePost: SubmitHandler<Post> = ({ content, published }) => {
		updateDoc(postRef, {
			content,
			published,
			updatedAt: serverTimestamp(),
		}).then(() => {
			toast.success('Post Updated successfully');
			reset({ content, published });
		});
	};

	return (
		<form onSubmit={handleSubmit(updatePost)}>
			{preview ? (
				<div className='bg-base-100 w-full px-4 py-8'>
					<ReactMarkdown className='prose '>{watch('content')}</ReactMarkdown>
				</div>
			) : (
				<>
					<ImageUploader />
					<textarea
						className='h-56 bg-base-100 w-full outline-none'
						id='content'
						{...register('content', {
							maxLength: { value: 20000, message: 'Content is too big!' },
							minLength: { value: 20, message: 'Content is too short!' },
							required: { value: true, message: 'Content is required!' },
						})}
					/>
				</>
			)}
			<div>
				{errors.content?.message && (
					<p className='text-red-600 font-bold mb-4'>
						{errors.content?.message}
					</p>
				)}
				<fieldset className='text-md my-4 flex items-center'>
					<input
						type='checkbox'
						className='checkbox checkbox-accent'
						id='published'
						{...register('published')}
					/>
					<label htmlFor='published' className='ml-3'>
						Publish
					</label>
					{/* <label className='flex items-center '>
						<input
							type='checkbox'
							className='checkbox checkbox-accent'
							id='published'
							{...register('published')}
						/>
						<span className='label-text ml-2'>Published</span>
					</label> */}
				</fieldset>

				<button
					className='btn btn-accent rounded-sm w-full'
					disabled={!isValid || !isDirty}>
					Save Changes
				</button>
			</div>
		</form>
	);
}
