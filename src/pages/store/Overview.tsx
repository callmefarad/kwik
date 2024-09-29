import React from "react";
import { Box, ShoppingCart, DollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useGetStoreByOwnerQuery,
	useViewAllStoreOrdersQuery,
} from "@/services/apiSlice";
import { format } from "date-fns"; // For date formatting
import NoDataFound from "@/components/NoDataFound";

export default function Overview() {
	const { data }: any = useGetStoreByOwnerQuery({});
	const { data: orderData, isLoading }: any = useViewAllStoreOrdersQuery(
		data?.data?.userId,
	);

	console.log("all prders", orderData);
	// Check if there is no order data
	const hasNoData =
		!isLoading && (!orderData?.data || orderData?.data.length === 0);

	// Sort orders by date (most recent first) and limit to 5 orders

	const recentOrders = orderData?.data
		?.slice() // Make a shallow copy of the array
		.sort(
			(a: any, b: any) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	const totalOrders = orderData?.data?.length || 0;
	const today = new Date();
	const totalTodayOrders =
		orderData?.data?.filter((order: any) => {
			const orderDate = new Date(order.createdAt);
			return (
				orderDate.getDate() === today.getDate() &&
				orderDate.getMonth() === today.getMonth() &&
				orderDate.getFullYear() === today.getFullYear()
			);
		}).length || 0;

	//calculating the total sales of all orders
	const totalSales =
		orderData?.data?.reduce((acc: number, order: any) => {
			return acc + order.totalAmount;
		}, 0) || 0;

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
		<>
			<div className='flex justify-between items-center mb-8'>
				<div>
					<h2 className='text-2xl font-bold'>
						Good Day, {data?.data?.storeName}
					</h2>
					<p className='text-gray-600'>Hope You're having a great Day</p>
				</div>
			</div>
			{/* Stats */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
				<StatCard
					icon={<Box />}
					title='Total Product'
					value={data?.data?.products?.length || 0}
					bg='#F3E5F5'
					tx='#8E24AA'
				/>
				<StatCard
					icon={<ShoppingCart />}
					title="Today's Order"
					value={totalTodayOrders}
					bg='#E1F1FF'
					tx='#3F7AFC'
				/>
				<StatCard
					icon={<Users />}
					title='Total Orders'
					value={totalOrders}
					bg='#FFF2D8'
					tx='#FFA001'
				/>
				<StatCard
					icon={<DollarSign />}
					title='Total Sales'
					value={`₦${totalSales.toLocaleString()}`} // Format as currency
					bg='#D1F3E0'
					tx='#3CB878'
				/>
			</div>
			{/* Recent Purchases */}
			<div className='bg-white p-4 rounded-lg shadow'>
				<h3 className='text-xl font-bold mb-4'>Recent Purchases</h3>
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
								{recentOrders?.flatMap((order: any) =>
									order?.products?.map((product: any) => (
										<TableRow key={product._id}>
											{/* Order number */}
											<TableCell>{recentOrders?.indexOf(order) + 1}</TableCell>
											{/* Placeholder for product image */}
											<TableCell>
												<div
													className='w-8 h-8 bg-gray-200 
rounded-full'></div>
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
		</>
	);
}

function StatCard({ icon, title, value, bg, tx }: any) {
	return (
		<div className='bg-white  p-4 rounded-lg shadow flex items-center space-x-4'>
			<div
				style={{
					background: bg,
					color: tx,
				}}
				className={`p-3 bg-[${bg}] text-[${tx}] rounded-full`}>
				{icon}
			</div>
			<div>
				<p className='text-sm text-gray-500'>{title}</p>
				<p className='text-2xl font-bold'>{value}</p>
			</div>
		</div>
	);
}

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
