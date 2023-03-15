import { Router } from 'next/router';
import { useContext, useEffect } from 'react';
import UserContext from '../../libs/context';

import styles from './LoadMan.module.css';
// import '../../styles/tailwind.animations.css';

type Props = {};
export default function SeconderyLoader({}: Props) {
	// const [loading, setLoading] = useState(false);
	const { loading, setLoading } = useContext(UserContext);
	useEffect(() => {
		Router.events.on('routeChangeStart', () => setLoading(true));
		Router.events.on('routeChangeComplete', () => setLoading(false));
		Router.events.on('routeChangeError', () => setLoading(false));
		return () => {
			Router.events.off('routeChangeStart', () => setLoading(true));
			Router.events.off('routeChangeComplete', () => setLoading(false));
			Router.events.off('routeChangeError', () => setLoading(false));
		};
	}, [setLoading]);

	return loading ? <Loader /> : null;
}
function Loader() {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80'>
			{/* <div className='w-16 h-16 border-4 border-t-2 rounded-full animate-spin'></div> */}
			<div className={styles['load-man']}></div>
		</div>
	);
}
