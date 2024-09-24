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
import { useToast } from "@/hooks/use-toast";
import { Register } from "@/utils/ApiCalls";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "@/services/reducers";
import LoaderComponent from "@/components/LoadingComponent";
import Cookies from "universal-cookie";

export default function SignUp() {
	const [showPassword, setShowPassword] = useState<any>(false);
	const dispatch = useDispatch();
	const { toast } = useToast();
	const navigate = useNavigate();
	const cookies = new Cookies();
	const [load, setLoad] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	async function onSubmit() {
		if (formData.confirmPassword !== formData.password) {
			toast({
				title: "Error!",
				description: "Passwords didn't match.",
				variant: "destructive",
			});
			return; // Early return to stop further execution if passwords don't match
		}

		try {
			setLoad(true);
			const response: any = await Register(formData);
			console.log(response);

			// Handle successful registration
			if (response?.status === 201) {
				cookies.set("Kwik_store", response?.data?.token, {
					path: "/",
				});
				// Optionally dispatch user details to the store
				dispatch(updateUserDetails(response?.data));

				toast({
					title: "Success!",
					description: "Registration was successful.",
				});
				window.location.href = "/store-setup";
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
		<div className='bg-bodyColor w-full h-full'>
			<Card className='w-full max-w-4xl mx-auto text-left xl:mt-20'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>
						Create an account
					</CardTitle>
					<p className='text-sm text-muted-foreground'>
						Already have an account?{" "}
						<Link to='/login' className='underline'>
							Log in
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
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='firstName'>Your Name</Label>
									<Input
										value={formData.firstName}
										name='firstName'
										onChange={handleOnChange}
										required
										id='firstName'
										placeholder='Enter your First Name'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='lastName'>Last Name</Label>
									<Input
										value={formData.lastName}
										name='lastName'
										onChange={handleOnChange}
										required
										id='lastName'
										placeholder='Enter your last name'
									/>
								</div>
							</div>
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
							<div className='grid grid-cols-2 gap-4'>
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
								<div className='space-y-2'>
									<Label htmlFor='confirmPassword'>Confirm</Label>
									<Input
										value={formData.confirmPassword}
										name='confirmPassword'
										onChange={handleOnChange}
										required
										id='confirmPassword'
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
							to='/login'
							className='text-sm text-muted-foreground underline whitespace-nowrap'>
							log in instead
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
