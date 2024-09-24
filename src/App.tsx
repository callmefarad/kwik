import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Toaster } from "@/components/ui/toaster";
import Cookies from "universal-cookie";

function App() {
	const cookies = new Cookies();
	const user = cookies.get("Kwik_store");
	console.log("ugjgkg", user);
	useEffect(() => {}, [user]);

	return (
		<>
			<Toaster />
			<RouterProvider
				router={createBrowserRouter([
					...(user ? PrivateRoute() : PublicRoute()),
				])}
			/>
		</>
	);
}

export default App;
