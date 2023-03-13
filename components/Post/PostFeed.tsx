import { Post } from '../../types';
import PostItem from './PostItem';

type Props = { posts: Post[] | null; admin?: boolean };
export default function PostFeed({ posts, admin = false }: Props) {
	return (
		<div className='card mb-8 rounded-sm'>
			{!posts || posts.length === 0 ? (
				<h2 className='text-xl my-2 font-bold card-title'>
					You have not posted anything yet
				</h2>
			) : (
				<>
					{/* <h2 className='text-3xl my-2 font-bold card-title'>Latest Posts</h2> */}
					{posts.map(post => (
						<PostItem post={post} key={post.slug} admin={admin} />
					))}
				</>
			)}
		</div>
	);
}
