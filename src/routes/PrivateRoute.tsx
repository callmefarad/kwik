import StoreLayouts from "@/components/layouts/StoreLayouts";
import Orders from "@/pages/store/Orders";
import Overview from "@/pages/store/Overview";
import Shop from "@/pages/store/Shop";
import NotFound from "@/pages/NotFound";
import StoreSetUp from "@/pages/StoreSetup";

const PrivateRoute = () => {
	return [
		{
			path: "/app/store",
			element: <StoreLayouts />,
			children: [
				{
					index: true,
					element: <Overview />,
				},
				{
					path: "orders",
					element: <Orders />,
				},
				{
					path: "shop",
					element: <Shop />,
				},
			],
		},

		{
			path: "/store-setup",
			element: <StoreSetUp />,
		},

		{
			// Redirect to the home page if the user tries to access a non-existing route
			path: "*",
			element: <NotFound />,
		},
	];
};

export default PrivateRoute;
