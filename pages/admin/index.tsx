import AuthCheck from '../../components/Others/AuthCheck';
import CreateNewPost from '../../components/Post/CreateNewPost';
import PostList from '../../components/Post/PostList';

type Props = {};
export default function AdminPostsPage({}: Props) {
	return (
		<main>
			<AuthCheck>
				<PostList />
				<CreateNewPost />
			</AuthCheck>
		</main>
	);
}
