import StoreLayouts from "@/components/layouts/StoreLayouts";
import Orders from "@/pages/store/Orders";
import Overview from "@/pages/store/Overview";
import Shop from "@/pages/store/Shop";

const PrivateRoute = () => {
	return {
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
	};
};

export default PrivateRoute;
