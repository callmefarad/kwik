import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setUserDetails, storePaymentDetails } from "@/services/reducers";
import { formatCardNumber, formatExpirationDate } from "@/helper";
import { CreatingCardPayment } from "@/utils/ApiCalls";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "@/components/LoadingComponent";
import { useAppSelector } from "@/services/store";

export default function VisualCardChargePayment() {
	const dispatch = useDispatch();
	const { toast } = useToast();
	const navigate = useNavigate();
	const totalPrice = useAppSelector(
		(state) => state.persistedReducer.totalPrice,
	);

	const StoreId = useAppSelector((state) => state.persistedReducer.storeLinkId);
	// Access user details from Redux state
	const user = useSelector(
		(state: any) => state?.persistedReducer?.addresses || {},
	);

	const cart = useAppSelector((state) => state?.persistedReducer.cart);
	const { name, email, address, phoneNumber } = user;

	console.log("this is cart", cart);

	//  state for card details
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cvc, setCvc] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isEditingAddress, setIsEditingAddress] = useState(false);
	const [pin, setPin] = useState<any>();

	// editing and saving the customer address
	const handleSaveDetails = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(setUserDetails({ name, email, address, phoneNumber }));
		setIsEditingAddress(false);
	};

	const [expiry_month, expiry_year] = expirationDate.split("/");
	// payment with card charge, including the customer details, storeid, and the cart items
	const handleOnCardChargePayment = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const response: any = await CreatingCardPayment({
			name: "Test Cards",
			number: cardNumber?.replace(/\s+/g, "").trim(),
			cvv: cvc,
			expiry_month: `${expiry_month}`,
			expiry_year: `${expiry_year}`,
			amount: totalPrice,
			pin,
			user: {
				name: user?.name,
				email: user?.email,
				address: user?.address,
			},

			storeOwner: {
				storeId: StoreId,
			},
			cart: cart.map((item) => ({
				productId: item._id,
				productName: item.name,
				quantity: item.quantity,
				price: item.price,
			})),
		});

		console.log("data submitted", response);
		if (response?.status >= 200 && response?.status < 300) {
			toast({
				title: "Success!",
				description: "Payment successful.",
			});
			dispatch(
				storePaymentDetails({
					transaction_reference:
						response?.data?.data?.data?.transaction_reference,
					amount: totalPrice,
				}),
			);
			setCardNumber("");
			setExpirationDate("");
			setCvc("");
			navigate("/success-payment");
			setIsLoading(false);
		} else if (response?.status >= 300 && response?.status < 400) {
			toast({
				title: "Error",
				description: "An error occured.",
			});
			setIsLoading(false);
		} else if (response?.status >= 400 && response?.status < 600) {
			toast({
				title: "Error",
				description: "An error occured.",
			});
			setIsLoading(false);
		}
	};

	if (isLoading) return <LoaderComponent />;

	return (
		<Card className='w-full max-w-md mx-auto mt-20 mb-20'>
			<CardHeader>
				<CardTitle>Card Payment</CardTitle>
				<CardDescription>
					Enter your card details to make a payment
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Display user address and edit button */}
				{name && email && address && phoneNumber && !isEditingAddress ? (
					<>
						<div className='mb-4'>
							<p className='font-semibold'>Selected Address:</p>
							<p>{address}</p>
							<Button
								variant='outline'
								className='mt-2'
								onClick={() => setIsEditingAddress(true)}>
								Edit Address
							</Button>
						</div>
						<form onSubmit={handleOnCardChargePayment} className='space-y-4'>
							{/* Card payment form */}
							<div className='relative h-48 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl shadow-lg overflow-hidden'>
								<div className='absolute top-4 left-4 w-12 h-8 bg-yellow-400 rounded-md'></div>
								<div className='absolute bottom-4 left-4 right-4 text-white'>
									<p className='text-lg font-mono'>
										{cardNumber || "•••• •••• •••• ••••"}
									</p>
									<div className='flex justify-between mt-4'>
										<p className='text-sm font-mono'>
											{expirationDate || "MM/YY"}
										</p>
										<p className='text-sm font-mono'>
											{cvc ? "•".repeat(cvc.length) : "CVC"}
										</p>
									</div>
								</div>
							</div>
							<div>
								<Label htmlFor='cardNumber'>Card Number</Label>
								<Input
									id='cardNumber'
									value={cardNumber}
									onChange={(e) =>
										setCardNumber(formatCardNumber(e.target.value))
									}
									placeholder='1234 5678 9012 3456'
									maxLength={19}
									required
								/>
							</div>
							<div className='flex space-x-4'>
								<div className='flex-1'>
									<Label htmlFor='expirationDate'>Expiration Date</Label>
									<Input
										id='expirationDate'
										value={expirationDate}
										onChange={(e) =>
											setExpirationDate(formatExpirationDate(e.target.value))
										}
										placeholder='MM/YY'
										maxLength={5}
										required
									/>
								</div>
								<div className='flex-1'>
									<Label htmlFor='cvc'>CVC</Label>
									<Input
										id='cvc'
										value={cvc}
										onChange={(e) =>
											setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
										}
										placeholder='123'
										maxLength={4}
										required
									/>
								</div>
							</div>
							<div>
								<Label htmlFor='pin'>Pin</Label>
								<Input
									id='pin'
									value={pin}
									required
									onChange={(e) => setPin(e.target.value)}
									placeholder='****'
								/>
							</div>

							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? "Processing..." : "Pay Now"}
							</Button>
						</form>
					</>
				) : (
					<form onSubmit={handleSaveDetails} className='space-y-4'>
						{/* Form for adding or editing address */}
						<div>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								value={name || ""}
								onChange={(e) =>
									dispatch(setUserDetails({ ...user, name: e.target.value }))
								}
								placeholder='Your Name'
							/>
						</div>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								value={email || ""}
								onChange={(e) =>
									dispatch(setUserDetails({ ...user, email: e.target.value }))
								}
								placeholder='Your Email'
							/>
						</div>
						<div>
							<Label htmlFor='address'>Address</Label>
							<Input
								id='address'
								value={address || ""}
								onChange={(e) =>
									dispatch(setUserDetails({ ...user, address: e.target.value }))
								}
								placeholder='Your Address'
							/>
						</div>
						<div>
							<Label htmlFor='phoneNumber'>Phone Number</Label>
							<Input
								id='phoneNumber'
								value={phoneNumber || ""}
								onChange={(e) =>
									dispatch(
										setUserDetails({ ...user, phoneNumber: e.target.value }),
									)
								}
								placeholder='Your Phone Number'
							/>
						</div>
						<Button type='submit'>Save Details</Button>
					</form>
				)}
			</CardContent>
		</Card>
	);
}
