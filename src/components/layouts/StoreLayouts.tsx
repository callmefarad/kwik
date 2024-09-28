import { Link, Outlet, useLocation } from "react-router-dom";
import {
	Home,
	ShoppingBag,
	Settings,
	ClipboardList,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";

export default function StoreLayouts() {
	const location = useLocation();
	const active = location?.pathname;
	const [menuOpen, setMenuOpen] = useState(false); // State to control the mobile menu visibility

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<div className='flex flex-col lg:flex-row min-h-screen text-left'>
			{/* Sidebar for Large Screens */}
			<aside className='hidden md:block fixed top-0 left-0 w-full lg:w-64 bg-white p-4 lg:min-h-screen h-screen z-10 border-r'>
				<h1 className='text-2xl font-bold mb-8'>KWIK</h1>
				<nav className='space-y-2'>
					<Link to='/app/store'>
						<a
							href='#'
							className={`flex items-center py-2 px-4 ${
								active === "/app/store" ? "bg-gray-200" : ""
							} rounded hover:bg-gray-100`}>
							<Home className='w-5 h-5 mr-2' /> Overview
						</a>
					</Link>

					<Link to='/app/store/orders'>
						<a
							href='#'
							className={`flex items-center py-2 px-4 ${
								active === "/app/store/orders" ? "bg-gray-200" : ""
							} rounded hover:bg-gray-100`}>
							<ClipboardList className='w-5 h-5 mr-2' /> Orders
						</a>
					</Link>

					<Link to='/app/store/shop'>
						<a
							href='#'
							className={`flex items-center py-2 px-4 ${
								active === "/app/store/shop" ? "bg-gray-200" : ""
							} rounded hover:bg-gray-100`}>
							<ShoppingBag className='w-5 h-5 mr-2' /> Shop
						</a>
					</Link>

					<Link to='/app/store/settings'>
						<a
							href='#'
							className={`flex items-center py-2 px-4 ${
								active === "/app/store/settings" ? "bg-gray-200" : ""
							} rounded hover:bg-gray-100`}>
							<Settings className='w-5 h-5 mr-2' /> Settings
						</a>
					</Link>
				</nav>
			</aside>

			{/* Mobile Sidebar / Hamburger Menu */}
			<div className='block md:hidden'>
				<header className='flex justify-between items-center p-4 bg-white border-b z-20 fixed w-full top-0'>
					<h1 className='text-2xl font-bold'>KWIK</h1>
					<button onClick={toggleMenu} className='focus:outline-none'>
						{menuOpen ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>
				</header>

				{/* Mobile Menu */}
				{menuOpen && (
					<div className='fixed top-0 left-0 w-full h-full bg-white p-4 z-20'>
						<nav className='space-y-2'>
							<Link to='/app/store'>
								<a
									href='#'
									className={`flex items-center py-2 px-4 ${
										active === "/app/store" ? "bg-gray-200" : ""
									} rounded hover:bg-gray-100`}
									onClick={toggleMenu}>
									<Home className='w-5 h-5 mr-2' /> Overview
								</a>
							</Link>

							<Link to='/app/store/orders'>
								<a
									href='#'
									className={`flex items-center py-2 px-4 ${
										active === "/app/store/orders" ? "bg-gray-200" : ""
									} rounded hover:bg-gray-100`}
									onClick={toggleMenu}>
									<ClipboardList className='w-5 h-5 mr-2' /> Orders
								</a>
							</Link>

							<Link to='/app/store/shop'>
								<a
									href='#'
									className={`flex items-center py-2 px-4 ${
										active === "/app/store/shop" ? "bg-gray-200" : ""
									} rounded hover:bg-gray-100`}
									onClick={toggleMenu}>
									<ShoppingBag className='w-5 h-5 mr-2' /> Shop
								</a>
							</Link>

							<Link to='/app/store/settings'>
								<a
									href='#'
									className={`flex items-center py-2 px-4 ${
										active === "/app/store/settings" ? "bg-gray-200" : ""
									} rounded hover:bg-gray-100`}
									onClick={toggleMenu}>
									<Settings className='w-5 h-5 mr-2' /> Settings
								</a>
							</Link>
						</nav>
					</div>
				)}
			</div>

			{/* Main Content */}
			<main className='flex-1 lg:ml-60'>
				{/* Header */}
				<header className='hidden md:block fixed top-0 left-0 lg:left-64 right-0 border-b bg-white p-4 z-20'>
					<div className='flex justify-between items-center'>
						<div>
							<h2 className='text-2xl font-bold'></h2>
							<p className='text-gray-600'></p>
						</div>
						<div className='flex items-center space-x-2'>
							{/* <span>Ali Musa</span> */}
							{/* <span className='text-sm text-gray-500'>Admin</span> */}
							<div className='w-10 h-10 bg-gray-300 rounded-full'>
								<img
									src='https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
									alt='Profile image'
								/>
							</div>
						</div>
					</div>
				</header>

				<div className='p-5 xl:p-12 pt-20 xl:pt-28'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}
