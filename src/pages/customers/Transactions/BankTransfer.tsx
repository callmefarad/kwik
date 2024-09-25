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
import { setUserDetails } from "@/services/reducers";

interface VirtualAccountProps {
	accountName: string;
	accountNumber: string;
	bankName: string;
	swiftCode: string;
	amount: number;
	currency: string;
}

export default function BankTransfer({
	accountName = "John Doe",
	accountNumber = "1234567890",
	bankName = "Virtual Bank Ltd.",
	swiftCode = "VRTBNK22",
	amount = 1000,
	currency = "USD",
}: VirtualAccountProps) {
	const dispatch = useDispatch();

	// Access user details from Redux state
	const user = useSelector(
		(state: any) => state?.persistedReducer?.addresses || {},
	);
	const { name, email, address, phoneNumber } = user;

	const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
	const [transferConfirmed, setTransferConfirmed] = useState(false);
	const [isEditingAddress, setIsEditingAddress] = useState(false);

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

	return (
		<Card className='w-full max-w-md mx-auto mt-20 mb-20'>
			<CardHeader>
				<CardTitle>Virtual Bank Account Details</CardTitle>
				<CardDescription>
					Please transfer {currency} {amount} to the following account
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
					<Input id='accountName' value={accountName} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='accountNumber'>Account Number</Label>
					<Input id='accountNumber' value={accountNumber} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='bankName'>Bank Name</Label>
					<Input id='bankName' value={bankName} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='swiftCode'>SWIFT Code</Label>
					<Input id='swiftCode' value={swiftCode} readOnly />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='amount'>Amount to Transfer</Label>
					<Input id='amount' value={`${currency} ${amount}`} readOnly />
				</div>
				{!transferConfirmed && (
					<div className='text-center text-lg font-semibold'>
						Time remaining: {formatTime(timeLeft)}
					</div>
				)}
			</CardContent>

			<CardFooter>
				<Button
					className='w-full'
					onClick={handleConfirmTransfer}
					disabled={transferConfirmed}>
					{transferConfirmed
						? "Transfer Confirmed"
						: "I have made the transfer"}
				</Button>
			</CardFooter>
		</Card>
	);
}
