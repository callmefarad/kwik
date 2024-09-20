import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Toaster } from "@/components/ui/toaster";

function App() {
	const [user, setUser] = useState(true);

	return (
		<>
			<Toaster />
			<RouterProvider
				router={createBrowserRouter([
					user ? PrivateRoute() : {},
					...PublicRoute(),
				])}
			/>
		</>
	);
}

export default App;
