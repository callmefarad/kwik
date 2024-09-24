"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function VisualCardChargePayment() {
	const toast = useToast();
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cvc, setCvc] = useState("");
	const [amount, setAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulate payment processing
		setTimeout(() => {
			setIsLoading(false);

			// Reset form
			setCardNumber("");
			setExpirationDate("");
			setCvc("");
			setAmount("");
		}, 2000);
	};

	const formatCardNumber = (value: string) => {
		const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(" ");
		} else {
			return value;
		}
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatCardNumber(e.target.value);
		setCardNumber(formattedValue);
	};

	const handleExpirationDateChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value.replace(/[^\d]/g, "");
		if (value.length <= 4) {
			const formatted = value.replace(/^(\d{2})/, "$1/");
			setExpirationDate(formatted);
		}
	};

	return (
		<Card className='w-full max-w-md mx-auto mt-20 mb-20'>
			<CardHeader>
				<CardTitle>Card Payment</CardTitle>
				<CardDescription>
					Enter your card details to make a payment
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='relative h-48 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl shadow-lg overflow-hidden'>
						<div className='absolute top-4 left-4 w-12 h-8 bg-yellow-400 rounded-md'></div>
						<div className='absolute bottom-4 left-4 right-4 text-white'>
							<p className='text-lg font-mono'>
								{cardNumber || "•••• •••• •••• ••••"}
							</p>
							<div className='flex justify-between mt-4'>
								<p className='text-sm font-mono'>{expirationDate || "MM/YY"}</p>
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
							onChange={handleCardNumberChange}
							placeholder='1234 5678 9012 3456'
							maxLength={19}
						/>
					</div>
					<div className='flex space-x-4'>
						<div className='flex-1'>
							<Label htmlFor='expirationDate'>Expiration Date</Label>
							<Input
								id='expirationDate'
								value={expirationDate}
								onChange={handleExpirationDateChange}
								placeholder='MM/YY'
								maxLength={5}
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
							/>
						</div>
					</div>
					<div>
						<Label htmlFor='amount'>Amount</Label>
						<Input
							id='amount'
							value={amount}
							onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
							placeholder='0.00'
						/>
					</div>
					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? "Processing..." : "Pay Now"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
