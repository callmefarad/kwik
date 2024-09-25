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
import { useGetStoreByOwnerQuery } from "@/services/apiSlice";

export default function Overview() {
	const { data }: any = useGetStoreByOwnerQuery({});
	console.log(data);
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
				/>
				<StatCard icon={<Users />} title="Today's Order" value='83' />
				<StatCard icon={<ShoppingCart />} title='Total Customers' value='37' />
				<StatCard icon={<DollarSign />} title='Total Sales' value='₦20, 113' />
			</div>
			{/* Recent Purchases */}
			<div className='bg-white p-4 rounded-lg shadow'>
				<h3 className='text-xl font-bold mb-4'>Recent Purchases</h3>
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>No</TableHead>
								<TableHead>Photo</TableHead>
								<TableHead>Product Name</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Purchase No</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{purchases.map((purchase, index) => (
								<TableRow key={index}>
									<TableCell>{purchase.no}</TableCell>
									<TableCell>
										<div className='w-8 h-8 bg-gray-200 rounded-full'></div>
									</TableCell>
									<TableCell>{purchase.productName}</TableCell>
									<TableCell>{purchase.quantity}</TableCell>
									<TableCell>{purchase.date}</TableCell>
									<TableCell>
										<Badge variant={getStatusVariant(purchase?.status)}>
											{purchase.status}
										</Badge>
									</TableCell>
									<TableCell>{purchase.purchaseNo}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
}

function StatCard({ icon, title, value }: any) {
	return (
		<div className='bg-white p-4 rounded-lg shadow flex items-center space-x-4'>
			<div className='p-3 bg-gray-100 rounded-full'>{icon}</div>
			<div>
				<p className='text-sm text-gray-500'>{title}</p>
				<p className='text-2xl font-bold'>{value}</p>
			</div>
		</div>
	);
}

const purchases = [
	{
		no: "#0021",
		productName: "Close Up",
		quantity: 2,
		date: "27th January 2024",
		status: "Canceled",
		purchaseNo: "NG22012383",
	},
	{
		no: "#0022",
		productName: "Titus",
		quantity: 1,
		date: "27th January 2024",
		status: "Completed",
		purchaseNo: "NG0100944",
	},
	{
		no: "#0021",
		productName: "Tooth Brush",
		quantity: 1,
		date: "27th January 2024",
		status: "Completed",
		purchaseNo: "NG81373310",
	},
	{
		no: "#0022",
		productName: "Maggi",
		quantity: 3,
		date: "26th January 2024",
		status: "Pending",
		purchaseNo: "NG8349824",
	},
	{
		no: "#0021",
		productName: "Groudnut Oil",
		quantity: 2,
		date: "26th January 2024",
		status: "Canceled",
		purchaseNo: "NG22012383",
	},
	{
		no: "#0022",
		productName: "Black Soap",
		quantity: 1,
		date: "26th January 2024",
		status: "Completed",
		purchaseNo: "NG0100944",
	},
	{
		no: "#0021",
		productName: "Akamu",
		quantity: 2,
		date: "25th January 2024",
		status: "Completed",
		purchaseNo: "NG6246248",
	},
];

function getStatusVariant(status: any) {
	switch (status.toLowerCase()) {
		case "completed":
			return "success";
		case "pending":
			return "warning";
		case "canceled":
			return "destructive";
		default:
			return "default";
	}
}
