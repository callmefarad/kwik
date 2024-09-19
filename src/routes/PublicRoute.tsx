import Login from "@/pages/Login";
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
	];
};
