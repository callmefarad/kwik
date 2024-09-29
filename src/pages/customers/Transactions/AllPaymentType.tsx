"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BanIcon, CreditCardIcon, HashIcon, WalletIcon } from "lucide-react";
import LoaderComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { setUserDetails, storeBankDetails } from "@/services/reducers";
import { useAppSelector } from "@/services/store";
import { IntializeBankTransfer } from "@/utils/ApiCalls";

export default function PaymentPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { toast } = useToast();
	const [load, setLoad] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [addressDetails, setAddressDetails] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		address: "",
	});

	const user = useAppSelector(
		(state) => state?.persistedReducer?.addresses || {},
	);
	const totalPrice = useAppSelector(
		(state) => state.persistedReducer.totalPrice,
	);

	const handleAddressSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowAddressForm(false);
		dispatch(setUserDetails(addressDetails));
		toast({
			title: "Address Added",
			description: "Your address has been successfully added.",
			variant: "default",
		});
	};

	const onHandleBankTransfer = async () => {
		// Check for missing user details (name, email, or address)
		if (!user?.name) {
			setShowAddressForm(true);
			return;
		}

		if (!user?.email) {
			setShowAddressForm(true);
			return;
		}

		if (!user?.address) {
			setShowAddressForm(true);
			return;
		}

		// If all required user details are available, proceed
		setLoad(true);
		try {
			const response: any = await IntializeBankTransfer({
				amount: totalPrice,
				user: {
					name: user?.name,
					email: user?.email,
				},
			});

			setLoad(false); // Stop loading once the API call is complete
			if (response?.data?.success) {
				dispatch(storeBankDetails(response.data.data?.data?.bank_account));
				navigate("/store/select-payment/banktransfer");
			} else {
				toast({
					title: "Error",
					description: "Failed to initialize Account Transfer",
					variant: "destructive",
				});
			}
		} catch (err) {
			console.error("Error during bank transfer initialization:", err);
			toast({
				title: "Error",
				description: "An unexpected error occurred during the transfer.",
				variant: "destructive",
			});
			setLoad(false);
		}
	};

	if (load) return <LoaderComponent />;

	return (
		<div className='flex flex-col bg-gray-50 mt-20 mb-20'>
			<main className='flex-grow flex flex-col items-center justify-center px-4'>
				<div className='text-center mb-8'>
					<h2 className='text-3xl font-bold mb-4'>Make Payment</h2>
					<p className='text-gray-600 max-w-2xl mx-auto'>
						There are many variations of passages of Lorem Ipsum available, but
						the majority have suffered alteration in some form, by injected
						humour, or randomised words which don't look even slightly
						believable.
					</p>
				</div>

				<Card className='w-full max-w-md'>
					<CardHeader>
						<CardTitle>Select Payment Option</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<Button
							onClick={onHandleBankTransfer}
							className='w-full justify-center bg-blue-600 text-white rounded-full'
							variant='outline'>
							<BanIcon className='mr-2 h-4 w-4' /> Bank Transfer
						</Button>
						<Button
							onClick={() => navigate("/store/select-payment/card-payment")}
							className='w-full bg-blue-600 text-white justify-center rounded-full'
							variant='outline'>
							<CreditCardIcon className='mr-2 h-4 w-4' /> Card
						</Button>
						<Button
							onClick={() => {
								toast({
									variant: "default",
									title: "Coming Soon",
									description: "This feature is not yet implemented",
									duration: 3000,
								});
							}}
							className='w-full justify-center bg-blue-600 text-white rounded-full'
							variant='outline'>
							<HashIcon className='mr-2 h-4 w-4' /> USSD
						</Button>
						<Button
							onClick={() => {
								toast({
									variant: "default",
									title: "Coming Soon",
									description: "This feature is not yet implemented",
									duration: 3000,
								});
							}}
							className='w-full justify-center bg-blue-600 text-white rounded-full'
							variant='outline'>
							<WalletIcon className='mr-2 h-4 w-4' /> Mobile Money
						</Button>
					</CardContent>
				</Card>

				<Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Add Address Details</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleAddressSubmit} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									value={addressDetails.name}
									onChange={(e) =>
										setAddressDetails({
											...addressDetails,
											name: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									value={addressDetails.email}
									onChange={(e) =>
										setAddressDetails({
											...addressDetails,
											email: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phoneNumber'>Phone Number</Label>
								<Input
									id='phoneNumber'
									value={addressDetails.phoneNumber}
									onChange={(e) =>
										setAddressDetails({
											...addressDetails,
											phoneNumber: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='address'>Address</Label>
								<Input
									id='address'
									value={addressDetails.address}
									onChange={(e) =>
										setAddressDetails({
											...addressDetails,
											address: e.target.value,
										})
									}
									required
								/>
							</div>
							<Button type='submit' className='w-full'>
								Submit
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</main>
		</div>
	);
}
