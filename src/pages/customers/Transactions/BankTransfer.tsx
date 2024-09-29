"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails, storePaymentDetails } from "@/services/reducers";
import { useAppSelector } from "@/services/store";
import { useNavigate } from "react-router-dom";
import { Instance } from "@/utils/AxiosConfig";
import { CreatingBankPayment } from "@/utils/ApiCalls";
import { useToast } from "@/hooks/use-toast";

export default function BankTransfer() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();
	// Access user details from Redux state
	const user = useSelector(
		(state: any) => state?.persistedReducer?.addresses || {},
	);
	const StoreId = useAppSelector((state) => state.persistedReducer.storeLinkId);
	// Access user details from Redux state

	const cart = useAppSelector((state) => state?.persistedReducer.cart);
	const { name, email, address, phoneNumber } = user;

	console.log("this is the cart", cart);

	const bankAccount = useAppSelector(
		(state) => state.persistedReducer.bankDetails,
	);
	const totalPrice = useAppSelector(
		(state) => state.persistedReducer.totalPrice,
	);

	const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
	const [transferConfirmed, setTransferConfirmed] = useState(false);
	const [isEditingAddress, setIsEditingAddress] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

	useEffect(() => {
		if (timeLeft > 0 && !transferConfirmed) {
			const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timerId);
		}
	}, [timeLeft, transferConfirmed]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
	};

	const handleConfirmTransfer = () => {
		setTransferConfirmed(true);
	};

	const handleSaveDetails = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(setUserDetails({ name, email, address, phoneNumber }));
		setIsEditingAddress(false);
	};

	const handleCreateOrder = async () => {
		const response2: any = await CreatingBankPayment({
			amount: totalPrice,
			user: {
				name: name,
				email: email,
				address: address,
			},
			storeOwner: {
				storeId: StoreId,
			},
			products: cart.map((item) => ({
				productId: item._id,
				productName: item.name,
				quantity: item.quantity,
				price: item.price,
			})),
		});

		console.log("Creating bank payment response:", response2);

		if (response2 && response2.status >= 200 && response2.status < 300) {
			toast({
				title: "Success!",
				description: "Payment successful.",
			});

			setTimeout(() => {
				navigate("/success-payment");
			}, 3000);
		} else {
			console.error("Failed to create bank payment:", response2);
			toast({
				title: "Error!",
				description: "Payment failed. Please try again.",
			});
		}
	};

	// Polling to check payment status from the backend after transfer is confirmed
	useEffect(() => {
		if (transferConfirmed) {
			const interval = setInterval(async () => {
				try {
					const response: any = await Instance.get("/payments");
					console.log("this is the payment", response);
					const userPayment = response?.data?.find(
						(payment: any) => payment.customer.email === email,
					);

					dispatch(
						storePaymentDetails({
							transaction_reference: response?.data?.payments[0]?.reference,
							amount: totalPrice,
						}),
					);
					navigate("/success-payment");

					if (userPayment) {
						setPaymentStatus(userPayment.status);
						alert("yooo");
						clearInterval(interval); // Stop polling once the status is received
					}
				} catch (error) {
					console.error("Error fetching payment status:", error);
				}
			}, 2000); // Poll every 5 seconds

			return () => clearInterval(interval);
		}
	}, [transferConfirmed, email]);

	return (
		<Card className='w-full max-w-md mx-auto mt-20 mb-20'>
			<CardHeader>
				<CardTitle>Virtual Bank Account Details</CardTitle>
				<CardDescription>
					Please transfer {"NGN"} {totalPrice} to the following account
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-4'>
				{/* Display selected address and edit button */}
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
					</>
				) : (
					<form onSubmit={handleSaveDetails} className='space-y-4'>
						{/* Address edit form */}
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

				{/* Virtual bank account details */}
				<div className='space-y-2'>
					<Label htmlFor='accountName'>Account Name</Label>
					<Input id='accountName' value={bankAccount.account_name} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='accountNumber'>Account Number</Label>
					<Input
						id='accountNumber'
						value={bankAccount.account_number}
						readOnly
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='bankName'>Bank Name</Label>
					<Input id='bankName' value={bankAccount.bank_name} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='swiftCode'>SWIFT Code</Label>
					<Input id='swiftCode' value={bankAccount.bank_code} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='amount'>Amount to Transfer</Label>
					<Input id='amount' value={`${"NGN"} ${totalPrice}`} readOnly />
				</div>

				{!transferConfirmed && (
					<div className='text-center text-lg font-semibold'>
						Time remaining: {formatTime(timeLeft)}
					</div>
				)}

				{/* Display payment status */}
				{paymentStatus && (
					<div className={`text-center text-lg font-semibold mt-4`}>
						Payment Status: {paymentStatus}
					</div>
				)}
			</CardContent>

			<CardFooter>
				<Button
					className='w-full'
					onClick={() => {
						handleConfirmTransfer();
						handleCreateOrder();
					}}
					disabled={transferConfirmed}>
					{transferConfirmed
						? "Transfer Confirmed"
						: "I have made the transfer"}
				</Button>
			</CardFooter>
		</Card>
	);
}
