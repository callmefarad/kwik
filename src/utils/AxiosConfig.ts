// src/utils/api.ts
import axios from "axios";
import Cookies from "universal-cookie";

// Initialize Cookies
const cookies = new Cookies();
// Retrieve the token from cookies
const token = `Bearer ${cookies.get("Kwik_store") || ""}`;
console.log(token);

// Configure Axios instance
export const Instance = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
	headers: {
		Authorization: token,
	},
});
