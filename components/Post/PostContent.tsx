import matter from 'gray-matter';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Post } from '../../types';

import md from 'markdown-it';
import marked from 'marked';

type Props = { post: Post };
export default function PostContent({ post }: Props) {
	const createdAt =
		typeof post.createdAt === 'number'
			? new Date(post.createdAt)
			: post.createdAt.toDate();

	const { data, content } = matter(post.content);

	return (
		<>
			<div className='mb-4'>
				<h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
				<span className='text-base'>
					Written by{' '}
					<Link href={`/${post.username}`} className='link text-blue-700'>
						@{post.username}{' '}
					</Link>
					on {createdAt.toLocaleString()}
				</span>
			</div>
			<div className='bg-base-100 px-4 py-8'>
				<ReactMarkdown className='prose'>{content}</ReactMarkdown>
			</div>
			{/* <div
				className='prose lg:prose-xl'
				dangerouslySetInnerHTML={{ __html: md().render(post.content) }}
			/> */}
		</>
	);
}

// function preprocessMarkdown(content: string) {
// 	// Set up a custom renderer that adds missing header tags
// 	 const options: MarkedOptions = {
// 			headerIds: false,
// 			gfm: true,
// 			breaks: true,
// 			sanitize: false,
// 			smartLists: true,
// 			smartypants: true,
// 			xhtml: true,
// 			// Define a custom function to add missing header tags
// 			// and wrap text in paragraph tags
// 			mangle: (
// 				text: string,
// 				options: marked.MarkedOptions,
// 				renderer: marked.Renderer
// 			) => {
// 				let lastType = '';
// 				renderer.heading = (text, level) => {
// 					lastType = 'heading';
// 					return `<h${level}>${text}</h${level}>`;
// 				};
// 				renderer.paragraph = text => {
// 					if (lastType === 'heading') {
// 						lastType = 'text';
// 						return `<p>${text}</p>`;
// 					}
// 					return `<p>${text}</p>`;
// 				};
// 				const html = marked.parser([renderer.lex(text)]);
// 				return html;
// 			},
// 		};

// 		// Parse the markdown content using marked with the custom options
// 		const processedContent = marked(content, options);

// 		return processedContent;
// }
