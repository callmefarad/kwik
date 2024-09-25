import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, QrCode, Trash } from "lucide-react";
import { useGetStoreByOwnerQuery } from "@/services/apiSlice";

export default function StoreSettings() {
	const { data }: any = useGetStoreByOwnerQuery({});
	const fullUrl = "https://kwikbysimpu.web.app/store";
	console.log(data);
	const [storeName, setStoreName] = useState(data?.data?.storeName || "");
	const [storeAddress, setStoreAddress] = useState(data?.data?.address || "");
	const [storeLink, setStoreLink] = useState(
		`${fullUrl}?storelink=${data?.data?.storeLink}` || "",
	);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(storeLink);
		alert("Store link copied to clipboard!");
	};

	const handleChangePassword = () => {
		// Implement password change logic here
		alert("Change password functionality to be implemented");
	};

	const handleDeleteStore = () => {
		// Implement store deletion logic here
		alert("Delete store functionality to be implemented");
	};

	useEffect(() => {}, [data]);

	return (
		<div className=''>
			<Card className='w-full '>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Store Settings</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='space-y-2'>
						<Label htmlFor='storeName'>Store Name</Label>
						<Input
							id='storeName'
							value={data?.data?.storeName || ""}
							readOnly
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='storeAddress'>Store Address</Label>
						<Input
							id='storeAddress'
							value={data?.data?.address || ""}
							readOnly
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='storeLink'>Store Link</Label>
						<div className='flex space-x-2'>
							<Input
								id='storeLink'
								value={`${fullUrl}?storelink=${data?.data?.storeLink}` || ""}
								readOnly
							/>
							<Button onClick={handleCopyLink} variant='outline' size='icon'>
								<Copy className='h-4 w-4' />
								<span className='sr-only'>Copy store link</span>
							</Button>
						</div>
					</div>
					<div className='space-y-2'>
						<Label>Store QR Code</Label>
						<div className='flex justify-center'>
							<div className='relative w-48 h-48'>
								<img
									className='object-cover w-full h-full rounded-lg'
									src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
										`${fullUrl}?storelink=${data?.data?.storeLink}` || "",
									)}`}
									alt='Store QR Code'
								/>
							</div>
						</div>
					</div>
				</CardContent>
				<Separator className='my-4' />
				<CardFooter className='flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0'>
					<Button onClick={handleChangePassword} variant='outline'>
						Change Password
					</Button>
					<Button onClick={handleDeleteStore} variant='destructive'>
						<Trash className='mr-2 h-4 w-4' /> Delete Store
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
