import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/services/reducers";
import { useToast } from "@/hooks/use-toast";

const products = [
	{
		id: 1,
		name: "Colgate Family Toothpaste",
		price: 1900,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 2,
		name: "Evaporated Peak Milk",
		price: 920,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 3,
		name: "Softwave Tissue Paper",
		price: 560,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 4,
		name: "Kemps Cream Crackers",
		price: 100,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 5,
		name: "Kemps Cream Crackers",
		price: 100,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 6,
		name: "Eva Family Soap",
		price: 500,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 7,
		name: "Wisdom ToothBrush",
		price: 350,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 8,
		name: "Premier Cool Soap",
		price: 700,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 9,
		name: "Viva Plus Detergent",
		price: 250,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 10,
		name: "Viva Plus Detergent",
		price: 200,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 11,
		name: "Eva Family Soap",
		price: 110,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 12,
		name: "Wisdom ToothBrush",
		price: 200,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 13,
		name: "Premier Cool Soap",
		price: 500,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 14,
		name: "Viva Plus Detergent",
		price: 100,
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 4,
		name: "Viva Plus Detergent",
		price: 190,
		image: "/placeholder.svg?height=100&width=100",
	},
];

const Home = () => {
	const dispatch = useDispatch();
	const { toast } = useToast();
	return (
		<div className='min-h-screen flex flex-col w-full'>
			<main className='flex-grow p-4'>
				<h2 className='text-3xl font-bold text-center mb-2'>Ali Shop</h2>
				<p className='text-center mb-8 text-muted-foreground'>Make Purchase</p>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{products.map((product: any, index) => (
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
				</div>
			</main>
		</div>
	);
};

export default Home;
