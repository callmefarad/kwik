import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className='bg-white border-t py-8 px-4'>
			<div className='max-w-6xl mx-auto'>
				<div className='flex flex-col md:flex-row justify-between mb-8'>
					<div className='mb-6 md:mb-0'>
						<h3 className='text-2xl font-bold text-blue-600 mb-4'>Kwik</h3>
						<p className='text-sm text-muted-foreground max-w-md'>
							Empowering Small Businesses to Succeed Online – Kwik simplifies
							your journey, giving you the tools to grow, connect, and thrive in
							the digital marketplace.
						</p>
					</div>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
						<div>
							<h4 className='font-semibold mb-3'>Company</h4>
							<ul className='text-sm space-y-2'>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Our Team
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Partners
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										FAQ's
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Blog
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold mb-3'>Get Help</h4>
							<ul className='text-sm space-y-2'>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Developers
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Sign In
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Mobile App
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Contact Us
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold mb-3'>Contact</h4>
							<ul className='text-sm space-y-2'>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										WhatsApp
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Support 24
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-muted-foreground 
hover:text-blue-600'>
										Our Services
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					className='flex flex-col md:flex-row justify-between items-center 
border-t pt-8'>
					<p className='text-sm text-muted-foreground mb-4 md:mb-0'>
						2024 © Kwik Group of Companies
					</p>
					<div className='flex space-x-6'>
						<Link to='#' className='text-muted-foreground hover:text-blue-600'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-5 h-5'>
								<path
									d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 
1 0 0 1 1-1h3z'></path>
							</svg>
							<span className='sr-only'>Facebook</span>
						</Link>
						<Link to='#' className='text-muted-foreground hover:text-blue-600'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-5 h-5'>
								<path
									d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.
4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 
7-3.8 1.1 0 3-1.2 3-1.2z'></path>
							</svg>
							<span className='sr-only'>Twitter</span>
						</Link>
						<Link to='#' className='text-muted-foreground hover:text-blue-600'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-5 h-5'>
								<path
									d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 
0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
								<rect width='4' height='12' x='2' y='9'></rect>
								<circle cx='4' cy='4' r='2'></circle>
							</svg>
							<span className='sr-only'>LinkedIn</span>
						</Link>
						<Link to='#' className='text-muted-foreground hover:text-blue-600'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-5 h-5'>
								<rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
								<path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
								<line x1='17.5' x2='17.51' y1='6.5' y2='6.5'></line>
							</svg>
							<span className='sr-only'>Instagram</span>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
