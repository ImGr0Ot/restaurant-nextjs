"use client"
import { useCartStore } from "@/utils/store"
import { ProductType } from "@/utils/types"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const Price = ({ product }: { product: ProductType }) => {
	const [total, setTotal] = useState(product.price)
	const [size, setSize] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const { addToCart } = useCartStore()

	useEffect(() => {
		setTotal(((product.price as number) + size) * quantity)
	}, [size, quantity, product])
	return (
		<>
			{" "}
			<div className='ml-2'>
				<div
					className='flex items-start w-full'
					role='group'>
					<h2 className='font-candara text-2xl font-bold'>
						${total.toFixed(2)}
					</h2>
				</div>
				<div className='flex gap-5 mt-5'>
					<button
						onClick={() => {
							setSize(0)
						}}
						className='ring-1 ring-slate-500 font-candara py-2 px-4 rounded-xl  min-w-[6rem] h-10 hover:ring-slate-700 duration-300'
						style={{
							borderRadius: size === 0 ? "0px" : "10px",
						}}>
						Small
					</button>
					<button
						defaultChecked
						onClick={() => {
							setSize(2)
						}}
						className='ring-1 ring-slate-500 font-candara py-2 px-4 rounded-xl  min-w-[6rem] h-10 hover:ring-slate-700 duration-300'
						style={{
							borderRadius: size === 2 ? "0px" : "10px",
						}}>
						Medium
					</button>
					<button
						onClick={() => {
							setSize(4)
						}}
						className='ring-1 ring-slate-500 font-candara py-2 px-4 rounded-xl  min-w-[6rem] h-10 hover:ring-slate-700 duration-300'
						style={{
							borderRadius: size === 4 ? "0px" : "10px",
						}}>
						Big
					</button>
				</div>
				<div className='flex justify-between items-center gap-5 w-full ring-1 ring-slate-500  rounded-sm p-2 my-5'>
					<div>
						<span>Quantity</span>
					</div>
					<div className='flex items-center gap-2'>
						<button
							onClick={() => {
								setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
							}}>
							{"<"}
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => {
								setQuantity((prev) => (prev < 5 ? prev + 1 : 5))
							}}>
							{">"}
						</button>
					</div>
				</div>
				<button
					className='bg-sky-700 hover:bg-sky-800 text-white p-2 rounded-lg font-candara'
					onClick={() => {
						addToCart({
							name: product.name as string,
							imgUrl: product.imgUrl as string,
							price: total as number,
							quantity: quantity,
						})
						toast.success("Added to the cart", {
							position: "top-right",
							autoClose: 5000,
						})
						setQuantity(1)
						setSize(0)
					}}>
					Add to cart
				</button>
			</div>
		</>
	)
}
