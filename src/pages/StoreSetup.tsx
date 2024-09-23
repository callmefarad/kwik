import { useState, useRef, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import QRCode from "qrcode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreatingStore } from "@/utils/ApiCalls";
import LoaderComponent from "@/components/LoadingComponent";

export default function Component() {
	const { toast } = useToast();
	const [currentStep, setCurrentStep] = useState(1);
	const [storeLink, setStoreLink] = useState("");
	const [productImage, setProductImage] = useState<string | null>(null);
	const [qrCodeDataURL, setQRCodeDataURL] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [storeData, setStoreData] = useState<any>();

	const [shopName, setShopName] = useState("");
	const [shopAddress, setShopAddress] = useState("");
	const [country, setCountry] = useState("");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");

	const steps = [
		{ number: 1, title: "Basic Info" },
		{ number: 2, title: "Generate Link" },
		{ number: 3, title: "Setup Store" },
	];

	useEffect(() => {
		generateQRCode();
	}, [storeLink]);

	const generateQRCode = async () => {
		try {
			const dataURL = await QRCode.toDataURL(storeLink);
			setQRCodeDataURL(dataURL);
		} catch (error) {
			console.error("Error generating QR code:", error);
			toast({
				title: "Error",
				description: "Failed to generate QR code",
				variant: "destructive",
			});
		}
	};

	const handleNext = (e: FormEvent) => {
		e.preventDefault();
		if (currentStep < steps.length) {
			if (currentStep === 1 && (!shopName || !shopAddress || !country)) {
				toast({
					title: "Error",
					description: "Please fill all required fields",
					variant: "destructive",
				});
				return;
			}
			onSubmitStore();
			if (currentStep === 3 && (!productImage || !productName || !price)) {
				toast({
					title: "Error",
					description: "Please fill all required fields and upload an image",
					variant: "destructive",
				});
				return;
			}
			setCurrentStep(currentStep + 1);
		} else {
			// Handle form submission
			toast({
				title: "Success",
				description: "Store setup completed!",
			});
		}
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(storeLink);
			toast({
				title: "Copied!",
				description: "Link copied to clipboard",
			});
		} catch (err) {
			toast({
				title: "Failed to copy",
				description: "Please try again",
				variant: "destructive",
			});
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProductImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const triggerImageUpload = () => {
		fileInputRef.current?.click();
	};

	const downloadQRCode = () => {
		if (qrCodeDataURL) {
			const link = document.createElement("a");
			link.href = qrCodeDataURL;
			link.download = "store-qr-code.png";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);

	async function onSubmitStore() {
		try {
			setLoad(true);
			const response: any = await CreatingStore({
				storeName: shopName,
				address: shopAddress,
				country,
			});

			console.log(response);
			// Handle successful registration
			if (response?.status === 201) {
				// Optionally dispatch user details to the store
				setStoreLink(response?.data?.store?.storeLink);
				console.log('i ran ', response?.data?.store);
				toast({
					title: "Success!",
					description: "Store Created successful.",
				});
				// navigate("/store-setup");
			} else if (response?.status >= 300 && response?.status < 400) {
				toast({
					title: "Error",
					description: "Redirection error. Please try again.",
					variant: "destructive",
				});
			} else if (response?.status >= 400 && response?.status < 500) {
				toast({
					title: "Error",
					description: "Client error. Please check your input.",
					variant: "destructive",
				});
			} else if (response?.status >= 500 && response?.status < 600) {
				toast({
					title: "Error",
					description: "Server error. Please try again later.",
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "An error occurred during registration. Please try again.",
				variant: "destructive",
			});
		} finally {
			setLoad(false); // Ensure this runs regardless of success or error
		}
	}
	if (load) return <LoaderComponent />;

	return (
		<div className='max-w-2xl mx-auto p-4'>
			<h1 className='text-3xl font-bold text-center mb-2'>Setup Your Store</h1>
			<p className='text-center text-gray-600 mb-8'>
				There are many variations of passages of Lorem Ipsum available, but the
				majority have suffered alteration in some form, by injected humour, or
				randomised words which don't look even slightly believable.
			</p>

			<div className='flex justify-between mb-8'>
				{steps.map((step) => (
					<div key={step.number} className='flex flex-col items-center'>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep === step.number
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-600"
							}`}>
							{step.number}
						</div>
						<span
							className={`text-sm mt-2 ${
								currentStep === step.number ? "text-blue-500" : "text-gray-600"
							}`}>
							{step.title}
						</span>
					</div>
				))}
			</div>

			<Card className='text-left'>
				<CardContent className='p-6'>
					<form onSubmit={handleNext}>
						{currentStep === 1 && (
							<div>
								<h2 className='text-xl font-semibold mb-4'>Basic Info</h2>
								<div className='space-y-4'>
									<div>
										<Label htmlFor='shopName'>Shop Name</Label>
										<Input
											name='storeName'
											id='shopName'
											placeholder='Enter your shop name'
											required
											onChange={(e) => setShopName(e.target.value)}
										/>
									</div>
									<div>
										<Label htmlFor='shopAddress'>Shop Address</Label>
										<Input
											id='shopAddress'
											placeholder='Enter your shop address'
											required
											value={shopAddress}
											onChange={(e) => setShopAddress(e.target.value)}
										/>
									</div>
									<div>
										<Label htmlFor='country'>Country</Label>
										<Input
											id='country'
											placeholder='Select your country'
											required
											value={country}
											onChange={(e) => setCountry(e.target.value)}
										/>
									</div>
								</div>
							</div>
						)}

						{currentStep === 2 && (
							<div>
								<h2 className='text-xl font-semibold mb-4'>Generate Link</h2>
								<p className='text-gray-600 mb-4'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut.
								</p>
								<div className='flex mb-4'>
									<Input value={storeLink} readOnly />
									<Button
										type='button'
										className='ml-2'
										onClick={copyToClipboard}>
										Copy Link
									</Button>
								</div>
								<div className='space-y-4'>
									<div>
										<h3 className='font-semibold mb-2'>
											Download Store QR Code
										</h3>
										<div className='bg-gray-100 w-48 h-48 flex items-center justify-center'>
											{qrCodeDataURL ? (
												<img
													src={qrCodeDataURL}
													alt='Store QR Code'
													className='w-full h-full'
												/>
											) : (
												<span className='text-gray-400'>
													Loading QR Code...
												</span>
											)}
										</div>
									</div>
									<Button
										type='button'
										onClick={downloadQRCode}
										disabled={!qrCodeDataURL}>
										Download QR Code
									</Button>
								</div>
							</div>
						)}

						{currentStep === 3 && (
							<div>
								<h2 className='text-xl font-semibold mb-4'>Set Up Store</h2>
								<p className='mb-4'>Add a Product to your shop</p>
								<div className='mb-4'>
									<div
										className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer'
										onClick={triggerImageUpload}>
										{productImage ? (
											<img
												src={productImage}
												alt='Product'
												className='max-w-full h-auto mx-auto'
											/>
										) : (
											<>
												<ImagePlus className='mx-auto text-gray-400 mb-2' />
												<Button type='button' variant='outline'>
													Upload Product Image
												</Button>
											</>
										)}
									</div>
									<input
										type='file'
										ref={fileInputRef}
										className='hidden'
										onChange={handleImageUpload}
										accept='image/*'
										required
									/>
								</div>
								<div className='space-y-4'>
									<div>
										<Label htmlFor='productName'>Product Name</Label>
										<Input
											id='productName'
											placeholder='Enter product name'
											required
											value={productName}
											onChange={(e) => setProductName(e.target.value)}
										/>
									</div>
									<div>
										<Label htmlFor='price'>Price</Label>
										<Input
											id='price'
											placeholder='Enter price'
											type='number'
											required
											value={price}
											onChange={(e) => setPrice(e.target.value)}
										/>
									</div>
								</div>
							</div>
						)}

						<div className='mt-6'>
							<Button type='submit' className='w-full'>
								{currentStep === steps.length ? "Complete Setup" : "Next"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
