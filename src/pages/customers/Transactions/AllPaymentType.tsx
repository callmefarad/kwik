import LoaderComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { storeBankDetails } from "@/services/reducers";
import { useAppSelector } from "@/services/store";
import { IntializeBankTransfer } from "@/utils/ApiCalls";
import {
	BanIcon,
	CreditCardIcon,
	HashIcon,
	BuildingIcon,
	WalletIcon,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
	const navigate = useNavigate();
	const user = useAppSelector(
		(state) => state?.persistedReducer?.addresses || {},
	);
	const { toast } = useToast();
	const [load, setLoad] = useState(false);
	const dispatch = useDispatch();

	const totalPrice = useAppSelector(
		(state) => state.persistedReducer.totalPrice,
	);
	const onHandleBankTransfer = async () => {
		setLoad(true);
		try {
			const response: any = await IntializeBankTransfer({
				amount: totalPrice,
				customer: {
					name: user?.name,
					email: user?.email,
				},
			});

			setLoad(false);

			if (response?.data?.success) {
				dispatch(storeBankDetails(response.data.data?.data?.bank_account));
				navigate("/store/select-payment/banktransfer");
			} else {
				setLoad(false);
				toast({
					title: "Error",
					description: "Failed to initialize Account Transfer",
					variant: "destructive",
				});
			}
		} catch (err) {
			return err;
		}
	};

	if (load) return <LoaderComponent />;
	return (
		<div
			className=' flex flex-col bg-gray-50 mt-20
        mb-20
        '>
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
							className='w-full bg-blue-600 text-white  justify-center rounded-full'
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
			</main>
		</div>
	);
}
