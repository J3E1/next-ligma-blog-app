import { useContext } from 'react';
import MetaTags from '../../components/Others/MetaTags';

import SignInWithGoogleButton from '../../components/UI/SignInWithGoogleButton';
import SignOutButton from '../../components/UI/SignOutButton';
import UserNameForm from '../../components/UI/UserNameForm';
import UserContext from '../../libs/context';

type Props = {};
export default function SignUpPage({}: Props) {
	const { user, username } = useContext(UserContext);

	// if (loading) return <SeconderyLoader />;

	return (
		<>
			<MetaTags title='Sign In' />
			<main>
				{user ? (
					!username ? (
						<UserNameForm />
					) : (
						<SignOutButton />
					)
				) : (
					<SignInWithGoogleButton />
				)}
			</main>
		</>
	);
}
