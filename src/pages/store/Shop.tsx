import ProductTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import React from "react";

const Shop = () => {
	return (
		<div>
			<div className='flex justify-between items-center '>
				<div>
					<h2 className='text-2xl font-bold'>My Shop</h2>
					<p className='text-gray-600'>Manage and oversee your product</p>
				</div>
				<div className='flex items-center space-x-2'>
					<Button variant='default'>Upload New Product</Button>
				</div>
			</div>
			<ProductTable />
		</div>
	);
};

export default Shop;
