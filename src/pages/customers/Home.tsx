import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/services/reducers";
import { useToast } from "@/hooks/use-toast";
import { useViewAllShopCustomerProductQuery } from "@/services/apiSlice";
import NoDataFound from "@/components/NoDataFound";

// Skeleton loader component
const ProductSkeleton = () => (
	<div className='border rounded-lg p-4 flex flex-col items-center animate-pulse'>
		<div className='w-24 h-24 bg-gray-300 mb-2' />
		<div className='h-4 bg-gray-300 w-3/4 mb-2' />
		<div className='h-4 bg-gray-300 w-1/2 mb-2' />
		<div className='h-8 bg-gray-300 w-full mt-auto' />
	</div>
);

const Home = () => {
	const dispatch = useDispatch();
	const { toast } = useToast();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const storelink = queryParams.get("storelink");
	const { data, isLoading }: any =
		useViewAllShopCustomerProductQuery(storelink);

	return (
		<div className='min-h-screen flex flex-col w-full'>
			<main className='flex-grow p-4'>
				<h2 className='text-3xl font-bold text-center mb-2'>
					Welcome to {data?.data?.storeName && data?.data?.storeName}
				</h2>
				<p className='text-center mb-8 text-muted-foreground'>Make Purchase</p>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{isLoading ? (
						// Render skeletons while loading
						<>
							{Array.from({ length: 10 }).map((_, index) => (
								<ProductSkeleton key={index} />
							))}
						</>
					) : data?.data?.products?.length >= 1 ? (
						// Render products once data is loaded
						<>
							{data?.data?.products.map((product: any, index: any) => (
								<div
									key={index}
									className='border rounded-lg p-4 flex flex-col items-center'>
									<img
										src={product.image?.url}
										alt={product.name}
										className='w-24 h-24 object-cover mb-2'
									/>
									<h3 className='font-semibold text-center'>{product.name}</h3>
									<p className='text-sm text-muted-foreground mb-2'>
										#{product.price?.toLocaleString()}
									</p>
									<Button
										onClick={() => {
											dispatch(addToCart(product));
											toast({
												title: "Success!",
												description: "Item added to cart.",
											});
										}}
										size='sm'
										className='mt-auto bg-blue-600 text-white'>
										Add to Cart
									</Button>
								</div>
							))}
						</>
					) : (
						// No data found
						<NoDataFound />
					)}
				</div>
			</main>
		</div>
	);
};

export default Home;
