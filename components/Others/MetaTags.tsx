import Head from 'next/head';

type Props = { title?: string; description?: string; image?: string };
export default function MetaTags({ title, description, image }: Props) {
	return (
		<Head>
			<title>{title ? `LIGMA | ${title}` : 'LIGMA'}</title>
			<meta name='twitter:card' content='summery' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={image} />

			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={image} />

			<meta name='description' content='Limga Blog' />
			<meta name='viewport' content='width=device-width, initial-scale=1' />

			<link
				rel='icon'
				type='image/png'
				sizes='192x192'
				href='/icon-192x192.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='256x256'
				href='/favicon-256x256.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='384x384'
				href='/favicon-384x384.png'
			/>
			<link
				rel='icon'
				type='image/png'
				sizes='512x512'
				href='/favicon-512x512.png'
			/>
			<link rel='manifest' href='/manifest.json' />
			<meta name='theme-color' content='#fff' />
		</Head>
	);
}
