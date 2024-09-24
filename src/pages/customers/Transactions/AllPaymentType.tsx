import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	BanIcon,
	CreditCardIcon,
	HashIcon,
	BuildingIcon,
	WalletIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
	const navigate = useNavigate();
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
							onClick={() => navigate("/store/select-payment/banktransfer")}
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
							className='w-full justify-center bg-blue-600 text-white rounded-full'
							variant='outline'>
							<HashIcon className='mr-2 h-4 w-4' /> USSD
						</Button>
						<Button
							className='w-full justify-center bg-blue-600 text-white rounded-full'
							variant='outline'>
							<BuildingIcon className='mr-2 h-4 w-4' /> Bank Account
						</Button>
						<Button
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
