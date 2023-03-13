import AuthCheck from '../../components/Others/AuthCheck';
import PostManager from '../../components/Post/PostManager';

type Props = {};
export default function AdminPostEditPage({}: Props) {
	return (
		<AuthCheck>
			<PostManager />
		</AuthCheck>
	);
}
