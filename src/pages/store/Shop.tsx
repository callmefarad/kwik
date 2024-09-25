import NoDataFound from "@/components/NoDataFound";
import ProductTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import { useGetStoreByOwnerQuery } from "@/services/apiSlice";
import { useNavigate } from "react-router-dom";

// Skeleton loader for the product table
const TableSkeleton = () => (
	<div className='animate-pulse'>
		<div className='h-6 bg-gray-300 w-1/4 mb-4' />
		{Array.from({ length: 5 }).map((_, index) => (
			<div key={index} className='flex justify-between items-center mb-2'>
				<div className='w-1/4 h-4 bg-gray-300' />
				<div className='w-1/4 h-4 bg-gray-300' />
				<div className='w-1/4 h-4 bg-gray-300' />
				<div className='w-1/4 h-4 bg-gray-300' />{" "}
			</div>
		))}
	</div>
);

const Shop = () => {
	const { data, isLoading }: any = useGetStoreByOwnerQuery({});
	const navigate = useNavigate();

	return (
		<div>
			<div className='flex justify-between items-center'>
				<div>
					<h2 className='text-2xl font-bold'>My Shop</h2>
					<p className='text-gray-600'>Manage and oversee your products</p>
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						onClick={() => navigate("/app/store/new-product")}
						variant='default'>
						Upload New Product
					</Button>
				</div>
			</div>

			{isLoading ? (
				// Show table skeleton while loading
				<TableSkeleton />
			) : data?.data?.products?.length >= 1 ? (
				// Show product table when data is loaded
				<ProductTable productData={data?.data?.products} />
			) : (
				// Show NoDataFound if no products are available
				<NoDataFound />
			)}
		</div>
	);
};

export default Shop;
