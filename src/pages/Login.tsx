import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import accountPic from "@/assets/Illustration-account.svg";
import ButtonGroup from "@/components/commons/ButtonGroup";
import LoaderComponent from "@/components/LoadingComponent";
import { updateUserDetails } from "@/services/reducers";
import { LogIn } from "@/utils/ApiCalls";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export default function Login() {
	const [showPassword, setShowPassword] = useState<any>(false);
	const dispatch = useDispatch();
	const { toast } = useToast();
	const navigate = useNavigate();
	const cookies = new Cookies();
	const [load, setLoad] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	async function onSubmit() {
		setLoad(true);

		try {
			const response: any = await LogIn(formData);
			console.log(response);
			// Handle successful registration
			if (response?.status === 200) {
				cookies.set("Kwik_store", response?.data?.token, {
					path: "/",
				});
				// Optionally dispatch user details to the store
				dispatch(updateUserDetails(response?.data));
				toast({
					title: "Success!",
					description: "Login successful.",
				});
				navigate("/app/store");
			} else if (response?.status >= 300 && response?.status < 400) {
				toast({
					title: "Error",
					description: "Redirection error. Please try again.",
					variant: "destructive",
				});
			} else if (response?.status >= 400 && response?.status < 500) {
				toast({
					title: "Error",
					description: `Email or password incorrect`,
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
		<div className='bg-bodyColor w-full h-full'>
			<Card className='w-full max-w-4xl mx-auto text-left'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>Welcome Back</CardTitle>
					<p className='text-sm text-muted-foreground'>
						Don't have an account?{" "}
						<Link to='/signup' className='underline'>
							Sign Up
						</Link>
					</p>
				</CardHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}>
					<CardContent className='flex'>
						<div className='space-y-4 flex-1'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email address</Label>
								<Input
									value={formData.email}
									name='email'
									onChange={handleOnChange}
									pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
									required
									id='email'
									type='email'
									placeholder='Enter your email address'
								/>
							</div>
							<div className='grid grid-cols-1 '>
								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<Input
										value={formData.password}
										name='password'
										onChange={handleOnChange}
										required
										id='password'
										type={showPassword ? "text" : "password"}
									/>
								</div>
							</div>
							<p className='text-sm text-muted-foreground'>
								Use 8 or more characters with a mix of letters, numbers &
								symbols
							</p>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='showPassword'
									checked={showPassword}
									onCheckedChange={setShowPassword}
								/>
								<Label htmlFor='showPassword'>Show password</Label>
							</div>
						</div>
						<div className=' hidden flex-1 md:flex xl:flex  items-center justify-center'>
							<img src={accountPic} />
						</div>
					</CardContent>
					<CardFooter className='flex  items-center gap-5 md:gap-20 xl:gap-20 '>
						<Link
							to='/signup'
							className='text-sm text-muted-foreground underline whitespace-nowrap'>
							Sign Up instead
						</Link>
						<ButtonGroup />
					</CardFooter>
				</form>
				<div className='flex justify-between px-6 py-4 border-t'>
					<Select defaultValue='en-US'>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select Language' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='en-US'>English (United States)</SelectItem>
							<SelectItem value='es'>Español</SelectItem>
							<SelectItem value='fr'>Français</SelectItem>
						</SelectContent>
					</Select>
					<div className='flex space-x-4'>
						<Link to='/' className='text-sm text-muted-foreground'>
							Help
						</Link>
						<Link to='/' className='text-sm text-muted-foreground'>
							Privacy
						</Link>
						<Link to='/' className='text-sm text-muted-foreground'>
							Terms
						</Link>
					</div>
				</div>
			</Card>
		</div>
	);
}
