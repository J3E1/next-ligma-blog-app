import { ReactNode } from 'react';

type Props = { children: ReactNode };
export default function Drawer({ children }: Props) {
	return (
		<div className='drawer drawer-end'>
			<input id='my-drawer' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content'>{children}</div>
			<div className='drawer-side'>
				<label htmlFor='my-drawer' className='drawer-overlay'></label>
				<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
					{/* <!-- Sidebar content here --> */}
					<li>
						<a>Sidebar Item 1</a>
					</li>
					<li>
						<a>Sidebar Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
