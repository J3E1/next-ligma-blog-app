/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
});
const nextConfig = withPWA({
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.pinimg.com',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'media.tenor.com',
			},
		],
	},
});

module.exports = nextConfig;
