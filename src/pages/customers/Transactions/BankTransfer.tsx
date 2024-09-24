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
	const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
	const [transferConfirmed, setTransferConfirmed] = useState(false);

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

	return (
		<Card className='w-full max-w-md mx-auto mt-20 mb-20'>
			<CardHeader>
				<CardTitle>Virtual Bank Account Details</CardTitle>
				<CardDescription>
					Please transfer {currency} {amount} to the following account
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
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
