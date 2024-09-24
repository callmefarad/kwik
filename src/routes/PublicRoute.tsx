import CustomerLayouts from "@/components/layouts/CustomerLayouts";
import Cart from "@/pages/customers/Cart";
import Home from "@/pages/customers/Home";
import PaymentPage from "@/pages/customers/Transactions/AllPaymentType";
import BankTransfer from "@/pages/customers/Transactions/BankTransfer";
import VisualCardChargePayment from "@/pages/customers/Transactions/CardChargePayment";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import OnBoarding from "@/pages/OnBoarding";
import SignUp from "@/pages/Signup";

export const PublicRoute = () => {
	return [
		{
			path: "/",
			element: <OnBoarding />,
		},

		{
			path: "/signup",
			element: <SignUp />,
		},
		{
			path: "/login",
			element: <Login />,
		},

		{
			path: "store",
			element: <CustomerLayouts />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "cart",
					element: <Cart />,
				},

				{
					path: "select-payment",
					children: [
						{
							index: true,
							element: <PaymentPage />,
						},
						{
							path: "banktransfer",
							element: <BankTransfer />,
						},

						{
							path: "card-payment",
							element: <VisualCardChargePayment />,
						},
					],
				},
			],
		},

		{
			// Redirect to the home page if the user tries to access a non-existing route
			path: "*",
			element: <NotFound />,
		},
	];
};
