import React from "react";

const ButtonGroup = () => {
	return (
		<button
			className='lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b 
border-gray-100   lg:border-0 px-6 lg:px-0 whitespace-nowrap'>
			<a
				href='#'
				className='flex justify-center items-center w-full sm:w-max px-6 h-12 rounded-full 
outline-none relative overflow-hidden border duration-300 ease-linear
after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 
after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 
after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 
border-transparent hover:border-[#172554]'>
				<span className='relative z-10 text-white'>Get Started</span>
			</a>
		</button>
	);
};

export default ButtonGroup;
