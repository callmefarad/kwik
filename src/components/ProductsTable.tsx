import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";

interface Product {
	id: string;
	name: string;
	image: string;
	price: number;
}

export default function ProductTable({ productData }: any) {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProducts = productData?.filter((product: any) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleEdit = (id: string) => {
		// Implement edit functionality
		console.log(`Edit product with id: ${id}`);
	};

	const handleDelete = (id: string) => {
		// Implement delete functionality
		console.log(`Delete product with id: ${id}`);
	};

	return (
		<div className='container mx-auto py-10 bg-white p-5 rounded-sm mt-5'>
			<Input
				type='search'
				placeholder='Search products...'
				className='mb-4'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Image</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredProducts.map((product: any) => (
						<TableRow key={product.id}>
							<TableCell>
								<img
									src={product.image?.url}
									alt={product.name}
									className='w-12 h-12 object-cover rounded'
								/>
							</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>#{product.price.toFixed(2)}</TableCell>
							<TableCell>{product.description}</TableCell>
							<TableCell>
								<div className='flex space-x-2'>
									<Button
										variant='outline'
										size='sm'
										onClick={() => handleEdit(product.id)}>
										<Pencil className='h-4 w-4 mr-1' />
										Edit
									</Button>
									<Button
										variant='outline'
										size='sm'
										onClick={() => handleDelete(product.id)}>
										<Trash2 className='h-4 w-4 mr-1' />
										Delete
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
