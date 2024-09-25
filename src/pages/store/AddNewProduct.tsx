import LoaderComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useGetStoreByOwnerQuery } from "@/services/apiSlice";
import { CreateNewProduct } from "@/utils/ApiCalls";
import { ImagePlus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
	const { toast } = useToast();
	const { data }: any = useGetStoreByOwnerQuery({});
	const [load, setLoad] = useState(false);
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState<any>();
	const [description, setDescription] = useState("This is a wonderful product");
	const [productImage, setProductImage] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [category, setCategory] = useState("General Merchandise");
	const navigate = useNavigate();
	const onHandleUploadProduct = async () => {
		setLoad(true);
		const formData = new FormData();
		formData.append("image", image);
		formData.append("name", productName);
		formData.append("price", price);
		formData.append("description", description);
		formData.append("category", category);
		const response: any = await CreateNewProduct(data?.data?._id, formData);
		console.log("product created", response);
		if (response?.status === 201) {
			setLoad(false);
			toast({
				title: "Success!",
				description: "Store Setup successful.",
			});
			window.location.href = "/app/store/shop";
		} else {
			setLoad(false);
		}
	};
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setImage(file);
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
	if (load) return <LoaderComponent />;
	return (
		<div className='lg:w-[400px] m-auto  mt-10 mb-10'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onHandleUploadProduct();
				}}>
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

				<div className='mt-6'>
					<Button type='submit' className='w-full'>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddNewProduct;
