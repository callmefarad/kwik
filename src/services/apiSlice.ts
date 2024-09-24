import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
		prepareHeaders: (headers) => {
			const token = cookies.get("Kao_cookie_user");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["stores", "products"],
	endpoints: (builder: any) => ({
		getStoreByOwner: builder.query({
			query: () => `/store/get-single`,
			providesTags: ["stores"],
		}),
	}),
});

export const { useGetStoreByOwnerQuery } = api;
