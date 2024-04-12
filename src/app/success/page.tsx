"use server"
import Link from "next/link"
import Image from "next/image"
import { connectDB } from "@/utils/mongoose"
import Order from "@/models/order.model"

const successPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) => {
	const orderId = searchParams.orderId as string
	if (orderId) {
		//update the order status to paid
		try {
			connectDB()
			await Order.findByIdAndUpdate(orderId.replace(/['"]+/g, ""), {
				status: "Done",
			})
			console.log("Order status updated")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className='bg-gradient-to-b from-green-500 h-[300px] w-full fixed top-0 -z-10'></div>
			<div className='bg-gradient-to-t from-green-500 h-[300px] w-full fixed bottom-0 -z-10'></div>
			<div className='flex flex-col mx-auto mt-32 max-w-screen-lg text-center items-center '>
				<div className='flex gap-5'>
					<h1 className='text-5xl font-bold text-green-500 font-candara animate-bounce'>
						🎉 Payment successful!
					</h1>
				</div>
				<div className='flex mt-10'>
					<Image
						unoptimized={true}
						height={400}
						width={300}
						alt='success gif'
						src='/c0a4ce21e959bba78e7cc0d3ed02f781.gif'
						className='object-contain'
					/>
				</div>
				<Link
					href={"/"}
					className='min-w-fit px-8 py-3 mt-10 text-white font-semibold bg-green-500 rounded-md hover:bg-green-600'>
					Go back to home
				</Link>
			</div>
		</>
	)
}

export default successPage
