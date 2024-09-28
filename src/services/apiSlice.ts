import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
		prepareHeaders: (headers) => {
			const token = cookies.get("Kwik_store");
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

		viewAllShopCustomerProduct: builder.query({
			query: (quaries: any) => `/store?storeLink=${quaries}`,
			// providesTags: ["reviews"],
		}),

		ViewAllStoreOrders: builder.query({
			query: (storeId: any) => `/${storeId}/purchase`,
			// providesTags: ["reviews"],
		}),
	}),
});

export const {
	useGetStoreByOwnerQuery,
	useViewAllShopCustomerProductQuery,
	useViewAllStoreOrdersQuery,
} = api;
