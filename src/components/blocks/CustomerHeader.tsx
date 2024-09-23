import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

const CustomerHeader = () => {
	return (
		<header className='flex justify-between items-center p-4 border-b bg-white'>
			<h1 className='text-2xl font-bold text-blue-600'>Kwik</h1>
			<div className='flex items-center gap-4'>
				<Button variant='ghost'>LOG IN</Button>
				<Button variant='outline' size='icon'>
					<ShoppingBag className='h-4 w-4' />
					<span className='sr-only'>Shopping cart</span>
				</Button>
			</div>
		</header>
	);
};

export default CustomerHeader;
