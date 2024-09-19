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
import { Link } from "react-router-dom";
import accountPic from "@/assets/Illustration-account.svg";
import ButtonGroup from "@/components/commons/ButtonGroup";

export default function Login() {
	const [showPassword, setShowPassword] = useState<any>(false);

	return (
		<div className='bg-bodyColor w-full h-full'>
			<Card className='w-full max-w-4xl mx-auto text-left'>
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
				<CardContent className='flex'>
					<div className='space-y-4 flex-1'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email address</Label>
							<Input
								id='email'
								type='email'
								placeholder='Enter your email address'
							/>
						</div>
						<div className='grid grid-cols-1 '>
							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type={showPassword ? "text" : "password"}
								/>
							</div>
						</div>
						<p className='text-sm text-muted-foreground'>
							Use 8 or more characters with a mix of letters, numbers & symbols
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
