"use client"
import Image from "next/legacy/image"
import GoogleButton from "./GoogleButton"
import { login } from "./loginActions"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { validateUserClient } from "../register/registerActions"

import { useContext, useLayoutEffect, useTransition } from "react"
import { Context } from "../context/Context"
import { PulseLoader } from "react-spinners"

const LoginPage = () => {
	const [isPending, startTransition] = useTransition()
	const { status } = useSession()
	const { isAuthenticated, setUser, setIsAuthenticated } = useContext(Context)
	const router = useRouter()
	const submitLogin = async (e: FormData) => {
		startTransition(async () => {
			//validating
			try {
				const messages = await validateUserClient(e)
				if (messages) {
					//error messages
					messages!.map((err) => {
						toast.error(JSON.stringify(err.message), {
							position: "top-right",
							autoClose: 7000,
						})
					})
				} else {
					const res = await login(e)

					//manage user repeat error
					if (res == "errorNotExists") {
						toast.error("User not exists", {
							position: "top-right",
							autoClose: 7000,
						})
					} else if (res == "errorNotPasswordMatch") {
						toast.error("Password not match", {
							position: "top-right",
							autoClose: 7000,
						})
					} else {
						setUser({ email: res as string })
						setIsAuthenticated(true)
					}
				}
			} catch (error) {
				console.log(error)
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
			<div className='mx-10'>
				<div className='flex flex-col mx-auto lg:flex-row mt-24 mb-16 bg-white max-w-screen-lg rounded-lg shadow-2xl'>
					<div className='lg:flex-1 relative h-[520px]'>
						<Image
							src={"/login-image.jpeg"}
							layout='fill'
							objectFit='cover'
							alt={"Login-Image"}
							className='rounded-lg'
						/>
					</div>

					<div className='flex flex-col gap-5 lg:flex-1 mb-10'>
						<h1 className='text-center text-xl font-bold mt-20'>Login</h1>
						<form
							action={submitLogin}
							className='flex flex-col gap-3'>
							<input
								name='email'
								type='email'
								placeholder='Email'
								className='p-2 border-gray-300 border-b-2  outline-none mx-28'
							/>
							<input
								name='password'
								type='password'
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
						<div className='inline-flex items-center justify-center w-full mt-4 mb-5'>
							<hr className='w-64' />
							<span className='absolute px-3 font-medium  bg-white'>or</span>
						</div>
						<GoogleButton />
						<p className='text-center'>
							Dont have an account yet ? &nbsp;
							<button
								onClick={() =>
									startTransition(() => {
										router.push("/register")
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
									"Register"
								)}
							</button>
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPage
