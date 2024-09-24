import { Link, Outlet, useLocation } from "react-router-dom";

export default function StoreLayouts() {
	const location = useLocation();
	// const navigate = useNavigate();
	const active = location?.pathname;
	return (
		<div className='flex flex-col lg:flex-row min-h-screen  text-left'>
			{/* Sidebar */}
			<aside className='fixed top-0 left-0 w-full lg:w-64 bg-white p-4 lg:min-h-screen h-screen z-10 border-r hidden xl:block md:block'>
				<h1 className='text-2xl font-bold mb-8'>KWIK</h1>
				<nav className='space-y-2'>
					<Link to='/app/store'>
						<a
							href='#'
							className={`block py-2 px-4 ${
								active === "/app/store" ? "bg-gray-200" : ""
							}  rounded`}>
							Overview
						</a>
					</Link>

					<Link to='/app/store/orders'>
						<a
							href='#'
							className={`block py-2 px-4 ${
								active === "/app/store/orders" ? "bg-gray-200" : ""
							} hover:bg-gray-100 rounded`}>
							Orders
						</a>
					</Link>

					<Link to='/app/store/shop'>
						<a
							href='#'
							className={`block py-2 px-4 ${
								active === "/app/store/shop" ? "bg-gray-200" : ""
							} hover:bg-gray-100 rounded`}>
							Shop
						</a>
					</Link>
				</nav>
			</aside>

			{/* Main Content */}
			<main className='flex-1 lg:ml-60  '>
				{/* Header */}
				<header className='fixed top-0 left-0 lg:left-64 right-0 border-b bg-white p-4 z-20'>
					<div className='flex justify-between items-center '>
						<div>
							<h2 className='text-2xl font-bold'></h2>
							<p className='text-gray-600'></p>
						</div>
						<div className='flex items-center space-x-2'>
							<span>Ali Musa</span>
							<span className='text-sm text-gray-500'>Admin</span>
							<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
						</div>
					</div>
				</header>

				{/* Offset for fixed header */}
				<div className='p-5 xl:p-12 pt-20 xl:pt-28'>
					<Outlet />
				</div>
			</main>
		</div>
	);
}
