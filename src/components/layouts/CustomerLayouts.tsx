import React from "react";
import CustomerHeader from "../blocks/CustomerHeader";
import { Outlet } from "react-router-dom";
import Footer from "../blocks/Footer";

const CustomerLayouts = () => {
	return (
		<div>
			<CustomerHeader />
			<Outlet />
			<Footer />
		</div>
	);
};

export default CustomerLayouts;
