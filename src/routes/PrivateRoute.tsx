import { Navigate } from "react-router-dom";
import StoreLayouts from "@/components/layouts/StoreLayouts";
import Orders from "@/pages/store/Orders";
import Overview from "@/pages/store/Overview";
import Shop from "@/pages/store/Shop";
import path from "path";
import Home from "@/pages/customers/Home";
import CustomerLayouts from "@/components/layouts/CustomerLayouts";

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
			path: "store",
			element: <CustomerLayouts />,
			children: [
				{
					index: true,
					element: <Home />,
				},
			],
		},
		{
			// Redirect to the home page if the user tries to access a non-existing route
			path: "*",
			element: <Navigate to='/' replace />,
		},
	];
};

export default PrivateRoute;
