type Props = {};
export default function SeconderyLoader({}: Props) {
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75'>
			<div className='w-16 h-16 border-4 border-t-2 rounded-full animate-spin'></div>
		</div>
	);

	return (
		<div className='transform rotate-45 perspective-1000 border-[3px] border-solid rounded-full w-[48px] h-[48px] text-white'>
			<div className='relative w-full h-full rounded-full animate-spin'>
				<div
					className='absolute w-full h-full rounded-full animate-spin'
					style={{ animationDelay: '0.4s', transform: 'rotateY(70deg)' }}>
					<div
						className='w-full h-full rounded-full shadow-md'
						style={{ boxShadow: '0.2em 0 0 currentcolor' }}></div>
				</div>
				<div
					className='absolute w-full h-full rounded-full animate-spin'
					style={{ transform: 'rotateX(70deg)' }}>
					<div
						className='w-full h-full rounded-full shadow-md'
						style={{ boxShadow: ' 0.2em 0 0 currentcolor' }}></div>
				</div>
			</div>
		</div>
	);
}
