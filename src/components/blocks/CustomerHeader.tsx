import { useAppSelector } from "@/services/store";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CustomerHeader = () => {
	const totalQuantity = useAppSelector(
		(state) => state.persistedReducer.totalQuantity,
	);
	const navigate = useNavigate();
	return (
		<header className='flex justify-between items-center p-4 border-b'>
			<Link to='/' className='text-2xl font-bold text-blue-600'>
				Kwik
			</Link>
			<div className='flex items-center gap-4'>
				<Button variant='ghost'>LOG IN</Button>
				<Button
					onClick={() => navigate("/store/cart")}
					variant='outline'
					size='icon'
					className='relative'>
					<ShoppingBag className='h-4 w-4' />
					{totalQuantity > 0 && (
						<span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
							{totalQuantity}
						</span>
					)}
					<span className='sr-only'>Shopping cart</span>
				</Button>
			</div>
		</header>
	);
};

export default CustomerHeader;
