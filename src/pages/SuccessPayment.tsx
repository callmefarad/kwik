import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppSelector } from "@/services/store";
import { useNavigate } from "react-router-dom";

export default function SuccessPayment() {
	const [isConfettiLaunched, setIsConfettiLaunched] = useState(false);
	const user = useAppSelector(
		(state) => state?.persistedReducer.paymentDetails || {},
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isConfettiLaunched) {
			launchConfetti();
			setIsConfettiLaunched(true);
		}
	}, [isConfettiLaunched]);

	const launchConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				<Card className='w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden'>
					<CardContent className='p-6'>
						<div className='text-center'>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
								<CheckCircle className='w-20 h-20 text-green-500 mx-auto mb-4' />
							</motion.div>
							<h2 className='text-3xl font-bold text-gray-800 mb-2'>
								Payment Successful!
							</h2>
							<p className='text-gray-600 mb-6'>
								Thank you for your purchase. Your order is confirmed.
							</p>
						</div>
						<div className='bg-green-50 rounded-lg p-4 mb-6'>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-sm font-medium text-gray-600'>
									Reference
								</span>
								<span className='text-sm font-bold text-gray-800'>
									{user?.transaction_reference}
								</span>
							</div>
							<div className='flex justify-between items-center'>
								<span className='text-sm font-medium text-gray-600'>
									Amount Paid
								</span>
								<span className='text-sm font-bold text-gray-800'>
									#{user?.amount}
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter className='bg-gray-50 px-6 py-4'>
						<div className='w-full space-y-2'>
							<Button
								className='w-full bg-green-500 hover:bg-green-600 text-white'
								onClick={launchConfetti}>
								<Download className='mr-2 h-4 w-4' /> Download Receipt
							</Button>
							<Button
								onClick={() => {
									navigate(-4);
								}}
								variant='outline'
								className='w-full'>
								Continue Shopping <ArrowRight className='ml-2 h-4 w-4' />
							</Button>
						</div>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
}
