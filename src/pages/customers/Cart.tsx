import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/services/store";
import { useDispatch } from "react-redux";
import {
	addToCart,
	clearCart,
	reduceQuantity,
	removeAProductCart,
	removeFromCart,
} from "@/services/reducers";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useAppSelector((state) => state.persistedReducer.cart);
	const totalQuantity = useAppSelector(
		(state) => state.persistedReducer.totalQuantity,
	);
	const totalPrice = useAppSelector(
		(state) => state.persistedReducer.totalPrice,
	);

	console.log("this cartugghui", cart);

	return (
		<main className='flex-grow container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold text-center mb-2'>Nylon</h1>
			<p className='text-center mb-8 text-muted-foreground'>
				Items you purchased can be found here
			</p>

			{cart.length === 0 ? (
				<div className='text-center max-w-2xl mx-auto'>
					<h2 className='text-xl font-semibold mb-2'>Don't Wait</h2>
					<h3 className='text-4xl font-bold mb-8'>Your Nylon Is Empty</h3>
					<div className='bg-gray-100 p-8 rounded-lg mb-8'>
						<p className='mb-4'>
							Your Nylon is currently empty. Be sure to go to the{" "}
							<div
								onClick={() => navigate(-1)}
								// to='/shop'
								className='text-blue-600 hover:underline'>
								shop
							</div>{" "}
							and make Purchases
						</p>
						<Button
							onClick={() => navigate(-1)}
							size='lg'
							asChild
							className='w-full sm:w-auto'>
							<div>Back to Shop</div>
						</Button>
					</div>
				</div>
			) : (
				<div>
					<h2 className='text-2xl font-bold mb-4'>Your Nylon Items</h2>
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead>
								<tr className='border-b'>
									<th className='text-left pr-20 sm:pr-0 lg:pr-0 xl:p-2'>
										PRODUCT
									</th>
									<th className='text-right p-2'>PRICE</th>
									<th className='text-center p-2'>QUANTITY</th>
									<th className='text-right p-2'>TOTAL</th>
									<th className='p-2'></th>
								</tr>
							</thead>
							<tbody>
								{cart.map((item: any) => (
									<tr key={item.id} className='border-b'>
										<td className='p-2'>
											<div className='flex items-center whitespace-nowrap overflow-hidden'>
												<img
													src={item.image?.url}
													alt={item.name}
													className='w-16 h-16 object-cover mr-4'
												/>
												<span>{item.name}</span>
											</div>
										</td>
										<td className='text-right p-2'>₦{item.price}</td>
										<td className='p-2'>
											<div className='flex items-center justify-center'>
												<Button
													variant='outline'
													size='icon'
													onClick={() => dispatch(reduceQuantity(item._id))}>
													<Minus className='h-4 w-4' />
												</Button>
												<span className='mx-2'>{item.quantity}</span>
												<Button
													variant='outline'
													size='icon'
													onClick={() => dispatch(addToCart(item))}>
													<Plus className='h-4 w-4' />
												</Button>
											</div>
										</td>
										<td className='text-right p-2'>
											₦{item.price * item.quantity}
										</td>
										<td className='p-2'>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => removeAProductCart(item?._id)}>
												<X className='h-4 w-4' />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div
							onClick={() => dispatch(clearCart())}
							className='mt-5 font-bold cursor-pointer'>
							Clear Cart
						</div>
					</div>
					<div className='bg-gray-100 p-6 mt-8 rounded-lg'>
						<h3 className='text-xl font-bold mb-4'>Order Summary</h3>
						<div className='space-y-2'>
							<div className='flex justify-between'>
								<span>TOTAL ITEMS:</span>
								<span>{totalQuantity}</span>
							</div>
							<div className='flex justify-between'>
								<span>SUBTOTAL:</span>
								<span>₦0</span>
							</div>
							<div className='flex justify-between font-bold text-blue-600'>
								<span>TOTAL:</span>
								<span>₦{totalPrice}</span>
							</div>
						</div>
						<Button
							onClick={() => navigate("/store/select-payment")}
							className='w-full mt-4'
							size='lg'>
							Proceed to Payment
						</Button>
					</div>
				</div>
			)}
		</main>
	);
};

export default Cart;
