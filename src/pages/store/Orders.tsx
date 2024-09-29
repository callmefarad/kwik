import {
	useGetStoreByOwnerQuery,
	useViewAllStoreOrdersQuery,
} from "@/services/apiSlice";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns"; // For date formatting
import NoDataFound from "@/components/NoDataFound";

const Orders = () => {
	const { data: StoreData }: any = useGetStoreByOwnerQuery({});

	const { data: orderData, isLoading }: any = useViewAllStoreOrdersQuery(
		StoreData?.data?.userId,
	);

	console.log("this is the store data", orderData);
	// Check if there is no order data
	const hasNoData =
		!isLoading && (!orderData?.data || orderData?.data.length === 0);

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

	return (
		<div>
			<div className='flex justify-between items-center '>
				<div>
					<h2 className='text-2xl font-bold'>All Orders</h2>
					<p className='text-gray-600'>All my orders</p>
				</div>
			</div>
			<div className='bg-white p-4 rounded-lg shadow'>
				<div className='overflow-x-auto'>
					{isLoading ? (
						// Show skeletons when loading
						<TableSkeleton />
					) : hasNoData ? (
						// Show NoDataFound if no products are available
						<div className='text-center p-4'>
							<NoDataFound />
						</div>
					) : (
						// Show actual table data when available
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>No</TableHead>
									<TableHead>Photo</TableHead>
									<TableHead>Product Name</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Address</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Purchase No</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{/* Map through orders and flatten the products */}
								{orderData?.data?.flatMap((order: any) =>
									order.products.map((product: any) => (
										<TableRow key={product._id}>
											{/* Order number */}
											<TableCell>{orderData.data.indexOf(order) + 1}</TableCell>

											{/* Placeholder for product image */}
											<TableCell>
												<div className='w-8 h-8 bg-gray-200 rounded-full'></div>
											</TableCell>

											{/* Product Name */}
											<TableCell>{product.productName}</TableCell>

											{/* Quantity */}
											<TableCell>{product.quantity}</TableCell>

											{/* Customer Name */}
											<TableCell>{order.customer.name}</TableCell>

											{/* Customer Address */}
											<TableCell>{order.customer.address}</TableCell>

											{/* Date - Formatting the createdAt field */}
											<TableCell>
												{format(new Date(order.createdAt), "dd/MM/yyyy")}
											</TableCell>

											{/* Payment Status */}
											<TableCell>
												<Badge variant={getStatusVariant(order.paymentStatus)}>
													{order.paymentStatus}
												</Badge>
											</TableCell>

											{/* Purchase No */}
											<TableCell>{order._id}</TableCell>
										</TableRow>
									)),
								)}
							</TableBody>
						</Table>
					)}
				</div>
			</div>
		</div>
	);
};

export default Orders;

// Utility function to map payment status to badge variants
function getStatusVariant(status: string) {
	switch (status.toLowerCase()) {
		case "paid":
			return "default";
		case "pending":
			return "secondary";
		case "canceled":
			return "destructive";
		default:
			return "outline";
	}
}
