"use client"
import Image from "next/image"
import { useCartStore } from "@/utils/store"
import {
	cancelOrder,
	createCheckoutSessionServer,
	createOrder,
} from "./cartActions"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useTransition } from "react"
import BeatLoader from "react-spinners/BeatLoader"

const CartPage = () => {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const searchParams = useSearchParams()
	const { products, totalItems, totalPrice, removeFromCart } = useCartStore()

	const updateOrder = async () => {
		const orderId = searchParams.get("orderId")
		if (orderId) {
			await cancelOrder(orderId.replace(/['"]+/g, ""))
		}
	}
	const createCheckoutSession = () => {
		startTransition(async () => {
			try {
				//call backend to create checkout session and create the order
				const orderId = await createOrder(products, totalPrice)
				const checkoutSession = await createCheckoutSessionServer(
					products,
					orderId!
				)
				if (checkoutSession) {
					//redirecting to stripe checkout
					router.push(checkoutSession)
				}
			} catch (error) {
				console.log(error)
			}
		})
	}
	useEffect(() => {
		updateOrder()
	})

	return (
		<>
			<div className='bg-gradient-to-b from-red-500 h-[300px] w-full fixed top-0 -z-10'></div>
			<div className='fixed bg-gradient-to-t from-red-500 h-[300px] w-full bottom-0 -z-10'></div>
			<h1 className='text-center text-4xl font-semibold mt-10 text-white font-hero'>
				Cart
			</h1>
			<div className='mx-10 lg:mx-20 mt-10 flex flex-col lg:flex-row gap-10'>
				<div className='lg:w-3/4 flex flex-col gap-5'>
					{products.map((item, index) => (
						<>
							<div
								key={index}
								className='flex justify-between mr-20 gap-4'>
								<div className='flex items-center gap-5 '>
									<div className='relative h-[100px] w-[100px]'>
										<Image
											fill
											src={item.imgUrl}
											alt={"photo of a product"}
										/>
									</div>
									<span className='font-semibold text-xl text-red-500 min-w-7'>
										X {item.quantity}
									</span>
									<span className='font-semibold text-xl text-red-500'>
										{item.name}
									</span>
									<span className='font-semibold text-xl text-red-500'>
										${item.price}
									</span>
								</div>
								<div className='flex justify-end'>
									<button
										className='text-red-500 hover:text-red-700 text-3xl'
										onClick={() => removeFromCart(item)}>
										X
									</button>
								</div>
							</div>
							<hr className=' border-red-300 mx-20 my-2' />
						</>
					))}
				</div>
				<div className='flex flex-col lg:w-1/4 bg-red-200 p-5 rounded-md justify-between h-[300px]'>
					<div className='flex flex-col gap-5 duration-500'>
						<div className='flex items-center justify-between'>
							<span className='font-semibold text-xl text-red-500'>
								Subtotal: ({totalItems} items)
							</span>
							<span className='font-semibold text-xl text-red-500'>
								${totalPrice}
							</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='font-semibold text-xl text-red-500'>Fee:</span>
							<span className='font-semibold text-xl text-red-500'>FREE</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='font-semibold text-xl text-green-500'>
								Total:
							</span>
							<span className='font-semibold text-xl text-green-500'>
								${totalPrice.toFixed(2)}
							</span>
						</div>
					</div>
					<div className='flex justify-end items-end'>
						<button
							onClick={createCheckoutSession}
							role='link'
							className={`text-white rounded-md p-2 my-5 min-w-28 ${
								isPending
									? "bg-green-500 hover:bg-green-700"
									: "bg-red-500 hover:bg-red-700"
							}
							`}>
							{isPending ? (
								<div className='flex items-center gap-2'>
									<BeatLoader
										color='white'
										size={10}
									/>
									<span className='text-white'>Checking</span>
								</div>
							) : (
								<span className='text-white'>Checkout</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default CartPage
