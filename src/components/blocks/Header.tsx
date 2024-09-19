import React from "react";
import ButtonGroup from "../commons/ButtonGroup";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className='absolute inset-x-0 top-0 z-50 py-6'>
			<div className='mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5'>
				<nav className='w-full flex justify-between gap-6 relative'>
					<div className='min-w-max inline-flex relative'>
						<a href='/' className='relative flex items-center gap-3'>
							<div className='relative w-7 h-7 overflow-hidden flex rounded-xl'>
								<span className='absolute w-4 h-4 -top-1 -right-1 bg-green-500 rounded-md rotate-45'></span>
								<span className='absolute w-4 h-4 -bottom-1 -right-1 bg-[#FCDC58] rounded-md rotate-45'></span>
								<span className='absolute w-4 h-4 -bottom-1 -left-1 bg-blue-600 rounded-md rotate-45'></span>
								<span className='absolute w-2 h-2 rounded-full bg-gray-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></span>
							</div>
							<div className='inline-flex text-lg font-semibold text-gray-900'>
								KWIK
							</div>
						</a>
					</div>

					<div
						data-nav-overlay
						aria-hidden='true'
						className='fixed hidden inset-0 lg:!hidden bg-gray-800/60 bg-opacity-50 backdrop-filter backdrop-blur-xl'></div>
					<div
						data-navbar
						className='flex invisible opacity-0  translate-y-10 overflow-hidden lg:visible lg:opacity-100  lg:-translate-y-0 lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-white lg:!bg-transparent border-x border-x-gray-100 lg:border-x-0'>
						<ul className='border-t border-gray-100  lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-gray-700 w-full lg:justify-center lg:items-center'></ul>

						<Link to='/signup'>
							<ButtonGroup />
						</Link>
					</div>

					<div className='min-w-max flex items-center gap-x-3'>
						<button
							data-toggle-navbar
							data-is-open='false'
							className='lg:hidden lg:invisible outline-none w-7 h-auto flex flex-col relative'>
							<span
								id='line-1'
								className='w-6 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ease-linear'></span>
							<span
								id='line-2'
								className='w-6 origin-center  mt-1 h-0.5 rounded-ful bg-gray-700 transition-all duration-300 ease-linear'></span>
							<span
								id='line-3'
								className='w-6 mt-1 h-0.5 rounded-ful bg-gray-700 transition-all duration-300 ease-linear'></span>
							<span className='sr-only'>togglenav</span>
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
