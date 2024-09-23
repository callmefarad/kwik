import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const products = [
	{
		name: "Colgate Family Toothpaste",
		price: "₦1,900",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Evaporated Peak Milk",
		price: "₦800",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Softwave Tissue Paper",
		price: "₦300",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Kemps Cream Crackers",
		price: "₦100",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Kemps Cream Crackers",
		price: "₦100",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Eva Family Soap",
		price: "₦700",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Wisdom ToothBrush",
		price: "₦350",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Premier Cool Soap",
		price: "₦250",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Viva Plus Detergent",
		price: "₦350",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Viva Plus Detergent",
		price: "₦350",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Eva Family Soap",
		price: "₦700",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Wisdom ToothBrush",
		price: "₦350",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Premier Cool Soap",
		price: "₦250",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Viva Plus Detergent",
		price: "₦350",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Viva Plus Detergent",
		price: "₦350",
		image: "/placeholder.svg?height=100&width=100",
	},
];

const Home = () => {
	return (
		<div className='min-h-screen flex flex-col w-full'>
			<main className='flex-grow p-4'>
				<h2 className='text-3xl font-bold text-center mb-2'>Shop</h2>
				<p className='text-center mb-8 text-muted-foreground'>Make Purchase</p>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{products.map((product, index) => (
						<div
							key={index}
							className='border rounded-lg p-4 flex flex-col items-center'>
							<img
								src={product.image}
								alt={product.name}
								className='w-24 h-24 object-cover mb-2'
							/>
							<h3 className='font-semibold text-center'>{product.name}</h3>
							<p className='text-sm text-muted-foreground mb-2'>
								{product.price}
							</p>
							<Button size='sm' className='mt-auto bg-blue-600 text-white'>
								Add to Cart
							</Button>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;
