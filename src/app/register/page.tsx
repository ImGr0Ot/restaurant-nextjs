"use client"
import Image from "next/legacy/image"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"
import { addUserClientToDatabase, validateUserClient } from "./registerActions"
import GoogleButton from "@/app/login/GoogleButton"
import { useSession } from "next-auth/react"
import { useLayoutEffect, useTransition } from "react"
import { PulseLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { Context } from "@/app/context/Context"

export default function RegisterPage() {
	const router = useRouter()
	const { status } = useSession()
	const [isPending, startTransition] = useTransition()
	const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context)

	const submitForm = async (e: FormData) => {
		startTransition(async () => {
			//validating the user

			const messages = await validateUserClient(e)
			if (messages) {
				messages!.map((err) => {
					toast.error(JSON.stringify(err.message), {
						position: "top-right",
						autoClose: 7000,
					})
				})
			} else {
				const res = await addUserClientToDatabase(e)
				if (res == "error") {
					toast.error("User already exists", {
						position: "top-right",
						autoClose: 7000,
					})
				} else {
					setUser({ email: res as string })
					setIsAuthenticated(true)
				}
			}
		})
	}
	useLayoutEffect(() => {
		if (status === "authenticated" || isAuthenticated) {
			router.push("/")
		}
	})

	return (
		<>
			{" "}
			<div className='bg-gradient-to-b from-slate-500 h-[300px] w-full fixed top-0 -z-10'></div>
			<div className='fixed bg-gradient-to-t from-slate-500 h-[300px] w-full bottom-0 -z-10'></div>
			<div className='flex flex-col  mx-10 sm:mx-20 md:mx-auto lg:flex-row mt-24 mb-16 bg-white max-w-screen-lg rounded-lg shadow-2xl'>
				<div className='lg:flex-1 relative h-[540px]'>
					<Image
						src={"/login-image.jpeg"}
						alt={"Login-Image"}
						layout='fill'
						objectFit='cover'
						className='rounded-lg'
					/>
				</div>

				<div className='flex flex-col gap-5 lg:flex-1 items-center justify-center mb-10'>
					<h1 className='text-center text-xl font-bold mt-20'>Register</h1>
					<form
						action={submitForm}
						className='flex flex-col gap-4'>
						<input
							type='email'
							name='email'
							placeholder='Email'
							className='p-2 border-gray-300 border-b-2  outline-none mx-28'
						/>
						<input
							type='password'
							name='password'
							placeholder='Password'
							className='p-2 border-gray-300 border-b-2  outline-none mx-28'
						/>

						<button
							type='submit'
							className='w-20 mx-28 mb-4 mt-2 bg-green-500 rounded-lg p-1 text-white shadow-xl '>
							{isPending ? (
								<PulseLoader
									color='white'
									size={8}
								/>
							) : (
								"Submit"
							)}
						</button>
					</form>

					<>
						<div className='inline-flex items-center justify-center w-full mt-4 mb-5'>
							<hr className='w-64' />
							<span className='absolute px-3 font-medium  bg-white'>or</span>
						</div>
						<GoogleButton />
					</>
					<p className='text-right'>
						Already have an account ?&nbsp;
						<button
							onClick={() =>
								startTransition(() => {
									router.push("/login")
								})
							}
							className='font-semibold hover:font-bold duration-500'>
							{" "}
							{isPending ? (
								<PulseLoader
									color='white'
									size={8}
								/>
							) : (
								"Login"
							)}
						</button>
					</p>
				</div>
			</div>
		</>
	)
}
