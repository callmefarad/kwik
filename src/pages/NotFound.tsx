import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
			<div className='text-center space-y-6'>
				<h1 className='text-6xl font-bold text-gray-800 dark:text-gray-200'>
					404
				</h1>
				<h2 className='text-3xl font-semibold text-gray-700 dark:text-gray-300'>
					Page Not Found
				</h2>
				<p className='text-xl text-gray-600 dark:text-gray-400'>
					Oops! The page you're looking for doesn't exist.
				</p>
				<div className='w-24 h-24 mx-auto'>
					<svg
						className='w-full h-full text-gray-700 dark:text-gray-300'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</div>
				<Link
					to='/'
					className='inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
					<Home className='w-5 h-5 mr-2' />
					Back to Home
				</Link>
			</div>
		</div>
	);
}
