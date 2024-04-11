"use client"
import Link from "next/link"
import "react-loading-skeleton/dist/skeleton.css"
import React, { useState } from "react"
import { CgMenuRightAlt } from "react-icons/cg"
import { MdCloseFullscreen } from "react-icons/md"
import { CiShoppingCart } from "react-icons/ci"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useCartStore } from "@/utils/store"
import { useContext } from "react"
import { Context } from "@/app/context/Context"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useTransition } from "react"
import { PulseLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import Skeleton from "react-loading-skeleton"
const NavBar = () => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathName = usePathname()
	const { data: session } = useSession()
	const [menuOpen, setMenuOpen] = useState(false)
	const { user, setIsAuthenticated, isAuthenticated } = useContext(Context)

	const { totalItems } = useCartStore()

	const getEmail = () => {
		if (session) return session.user?.email
		else if (isAuthenticated) return user.email
	}
	const handleNav = () => {
		setMenuOpen(!menuOpen)
	}

	const logoutHandler = () => {
		setIsAuthenticated(false)
		if (session) {
			signOut({ redirect: false })
		}
	}

	return (
		<div className='flex justify-between z-10 w-full text-white'>
			<div className='flex duration-500 w-1/3 md:w-1/4 md:mx-16'>
				<Link href={"/"}>
					<Image
						className='cursor-pointer'
						src={"/GROOTLOGO-removebg--WHITE-VECTORIZADO-ARREGLADOsvg.svg"}
						width={80}
						height={80}
						alt='logo'
					/>
				</Link>
			</div>

			<div className='flex items-center  lg:hidden pt-2 cursor-pointer mx-8'>
				<div
					className={
						menuOpen
							? "fixed lg:hidden right-8 top-3 rounded-xl text-[12px]  w-[200px] h-[150px] duration-500 mx-12 sm:mx-28 z-20"
							: "fixed left-[-100%]"
					}>
					<div className='bg-slate-200 rounded-md p-2 bg-opacity-25'>
						<div className='flex flex-col items-end'>
							<MdCloseFullscreen
								onClick={handleNav}
								size={20}
								className='hover:size-[25px] fill-white hover:scale-110 duration-700'
							/>
						</div>
						<div className='flex flex-col items-center text-[16px] gap-4 text-center'>
							<button
								onClick={() =>
									startTransition(() => {
										handleNav(), router.push("/")
									})
								}
								className={` bg-slate-700  rounded-md p-2  min-w-36 ${
									pathName === "/"
										? "hidden"
										: "hover:scale-110 duration-500 bg-opacity-40"
								} `}>
								{isPending ? (
									<PulseLoader
										color='white'
										size={8}
									/>
								) : (
									"Home Page"
								)}
							</button>
							{getEmail() == "admin@gmail.com" && (
								<>
									<button
										onClick={() =>
											startTransition(() => {
												handleNav(), router.push("/createProduct")
											})
										}
										className='cursor-pointer'>
										<h1 className='hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2  min-w-36'>
											{isPending ? (
												<PulseLoader
													color='white'
													size={8}
												/>
											) : (
												"Create a product"
											)}
										</h1>
									</button>
									<button
										onClick={() =>
											startTransition(() => {
												handleNav(), router.push("/orders")
											})
										}
										className='cursor-pointer'>
										<h1 className='hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2  min-w-36'>
											{isPending ? (
												<PulseLoader
													color='white'
													size={8}
												/>
											) : (
												"Orders"
											)}
										</h1>
									</button>
								</>
							)}
							{isAuthenticated || session ? (
								<button
									onClick={() =>
										startTransition(() => {
											handleNav(), logoutHandler()
										})
									}
									className='cursor-pointer'>
									<h1 className='hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2  min-w-36'>
										{isPending ? (
											<PulseLoader
												color='white'
												size={8}
											/>
										) : (
											"Logout"
										)}
									</h1>
								</button>
							) : (
								<button
									onClick={() =>
										startTransition(() => {
											handleNav(), router.push("/login")
										})
									}
									className={
										pathName === "/login"
											? "hidden"
											: "hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md min-w-36 p-2 "
									}>
									{isPending ? (
										<PulseLoader
											color='white'
											size={8}
										/>
									) : (
										"Login"
									)}
								</button>
							)}
							<button
								onClick={() =>
									startTransition(() => {
										handleNav(), router.push("/Menu")
									})
								}
								className={`${
									pathName == "/Menu" ? "hidden" : "cursor-pointer"
								}`}>
								<h1 className='hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2  min-w-36'>
									{isPending ? (
										<PulseLoader
											color='white'
											size={8}
										/>
									) : (
										"Menu"
									)}
								</h1>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='flex w-2/3 md:w-3/4 items-center justify-end pt-2'>
				<div className='lg:flex hidden gap-4 md:mx-16 cursor-pointer'>
					<button
						onClick={() =>
							startTransition(() => {
								router.push("/")
							})
						}
						className={` bg-slate-700  rounded-md p-2   ${
							pathName === "/"
								? "hidden"
								: "hover:scale-110 duration-500 bg-opacity-40"
						} `}>
						{isPending ? (
							<PulseLoader
								color='white'
								size={8}
							/>
						) : (
							"Home Page"
						)}
					</button>

					{getEmail() === "admin@gmail.com" && (
						<>
							<button
								onClick={() =>
									startTransition(() => {
										router.push("/createProduct")
									})
								}
								className='cursor-pointer'>
								<h1 className='hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2 '>
									{isPending ? (
										<PulseLoader
											color='white'
											size={8}
										/>
									) : (
										"Create a Product"
									)}
								</h1>
							</button>
							<button
								onClick={() =>
									startTransition(() => {
										router.push("/orders")
									})
								}
								className='cursor-pointer'>
								<h1 className='hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2 '>
									{isPending ? (
										<PulseLoader
											color='white'
											size={8}
										/>
									) : (
										"Orders"
									)}
								</h1>
							</button>
						</>
					)}

					<button
						onClick={() =>
							startTransition(() => {
								router.push("/Menu")
							})
						}
						className={`${
							pathName === "/Menu"
								? "hidden"
								: "bg-opacity-40 hover:scale-110 duration-500 bg-slate-700  rounded-md p-2"
						}`}>
						{isPending ? (
							<PulseLoader
								color='white'
								size={8}
							/>
						) : (
							"Menu"
						)}
					</button>
					{isAuthenticated || session ? (
						<button
							onClick={() =>
								startTransition(() => {
									logoutHandler()
								})
							}
							className='cursor-pointer'>
							<h1 className=' hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2 '>
								{isPending ? (
									<PulseLoader
										color='white'
										size={8}
									/>
								) : (
									"Logout"
								)}
							</h1>
						</button>
					) : (
						<button
							onClick={() =>
								startTransition(() => {
									router.push("/login")
								})
							}
							className={
								pathName === "/login"
									? " hidden"
									: " hover:scale-110 duration-500 bg-slate-700 bg-opacity-40 rounded-md p-2 "
							}>
							{isPending ? (
								<PulseLoader
									color='white'
									size={8}
								/>
							) : (
								"Login"
							)}
						</button>
					)}
				</div>
				{(isAuthenticated || session) && (
					<h1
						className='
				'>
						{getEmail() || (
							<Skeleton
								width={300}
								height={30}
							/>
						)}
					</h1>
				)}
				<div className='lg:hidden cursor-pointer mr-4 ml-2'>
					<CgMenuRightAlt
						color='white'
						onClick={handleNav}
						size={25}
						className={menuOpen ? "hidden" : "hover:scale-110 duration-500"}
					/>
				</div>
				<button
					onClick={() =>
						startTransition(() => {
							router.push("/cart")
						})
					}
					className='flex sm:mr-20 mr-1 duration-500 gap-1'>
					{isPending ? (
						<PulseLoader
							color='white'
							size={8}
						/>
					) : (
						<>
							<CiShoppingCart
								color='white'
								size={30}
							/>
							<span className='mt-1'>({totalItems})</span>
						</>
					)}
				</button>
			</div>
		</div>
	)
}

export default NavBar
