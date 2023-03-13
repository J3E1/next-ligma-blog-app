import Link from 'next/link';
import { Post } from '../../types';

type Props = { post: Post; admin: boolean };
export default function PostItem({ post, admin }: Props) {
	const wordCount = post?.content.trim().split(/\s+/g).length;
	const minutesToRead = (wordCount / 100 + 1).toFixed(0);

	return (
		<div className='mb-4 rounded-sm bg-base-100 hover:bg-base-300 shadow-md'>
			<Link href={`/${post.username}/${post.slug}`} className='card-body'>
				<h3 className='mb-1 text-md font-medium'>By @{post.username}</h3>

				<h3 className='mb-2 text-xl font-semibold'>
					<span>{post.title} </span>
				</h3>

				<div className='flex justify-between flex-wrap gap-2'>
					<div className='mr-2 badge badge-info badge-lg badge-outline'>
						<span>
							👁{wordCount} words. {minutesToRead} min read
						</span>
					</div>
					<div className='mr-2 badge badge-success badge-lg badge-outline'>
						<span>💗 {post.heartCount || 0} Hearts</span>
					</div>
				</div>

				{admin && (
					<div className='mt-4 flex justify-between items-center'>
						<Link
							href={`/admin/${post.slug}`}
							className='btn btn-sm sm:btn-md btn-accent text-white rounded-sm'>
							Edit
						</Link>

						{post.published ? (
							<span className='text-success font-bold'>Live</span>
						) : (
							<span className='text-red-600 font-bold'>Unspanublished</span>
						)}
					</div>
				)}
			</Link>
		</div>
	);
}
