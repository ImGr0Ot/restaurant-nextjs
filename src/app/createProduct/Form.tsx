"use client"

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage"
import { app } from "../../utils/firebase"
import React from "react"
import { z } from "zod"
import { useRef } from "react"
import { toast } from "react-toastify"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { addProduct } from "./productsActions"
import { MdImageSearch } from "react-icons/md"
import { useTransition } from "react"

const Form = () => {
	const [isPending, startTransition] = useTransition()
	const storage = getStorage(app)
	const router = useRouter()
	const searchParams = useSearchParams()
	const refForm = useRef<HTMLFormElement>(null)
	const ProductSchema = z.object({
		name: z
			.string()
			.max(30, "Product's name: Max length is 30 characters")
			.min(8, "Product's name: Min length is 8 characters"),
		description: z
			.string()
			.max(50, "Product's description: Max length is 50 characters")
			.min(10, "Product's description: Min length is 10 characters"),

		category: z.string().min(1, "Category: Category is required"),
		price: z
			.number()
			.min(1, "Price: Price is required")
			.max(50, "Price: Price is too high"),
	})
	const formAction = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		startTransition(async () => {
			//upload the image code *********************************************
			if (searchParams.get("imgUrl")) {
				router.replace("/createProduct")
			}
			const img = (
				e.currentTarget.elements.namedItem("image") as HTMLInputElement
			).files?.[0] as File
			const ProductName = (
				e.currentTarget.elements.namedItem("name") as HTMLInputElement
			).value
			const description = (
				e.currentTarget.elements.namedItem("description") as HTMLInputElement
			).value
			const category = (
				e.currentTarget.elements.namedItem("category") as HTMLInputElement
			).value
			const price = parseFloat(
				(e.currentTarget.elements.namedItem("price") as HTMLInputElement).value
			)
			//validations**************************************
			//getting data from form

			const product = ProductSchema.safeParse({
				name: ProductName,
				description,
				category,
				price,
			})

			if (!product.success) {
				product.error.issues.forEach((error) => {
					toast.error(error.message, {
						position: "top-right",
						autoClose: 6000,
					})
				})
				return
			}

			if (!img) {
				toast.error("Image is required", {
					position: "top-right",
					autoClose: 6000,
				})
			}
			const name = img.name
			const storageRef = ref(storage, name)

			const uploadTask = uploadBytesResumable(storageRef, img)

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log("Upload is " + progress + "% done")
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused")
							break
						case "running":
							console.log("Upload is running")
							break
					}
				},
				(error) => {
					console.log(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						const url = new URLSearchParams({
							imgUrl: downloadURL,
						})
						router.push(`?${searchParams}&${url.toString() as any}`)

						//adding product to database **********************************
						const res = await addProduct(
							product.data.name,
							product.data.description,
							product.data.price,
							downloadURL,
							product.data.category
						)

						res == "Product already exists"
							? toast.error(res, {
									position: "top-right",
									autoClose: 6000,
							  })
							: (toast.success(res, {
									position: "top-right",
									autoClose: 6000,
							  }),
							  refForm.current?.reset())
					})
				}
			)
		})
	}

	return (
		<>
			<div className='bg-gradient-to-b from-indigo-500 h-[300px] w-full fixed top-0 -z-10' />
			<div className='bg-gradient-to-t from-indigo-500 h-[300px] w-full fixed bottom-0 -z-10' />
			<h1 className='text-4xl rounded-xl text-center mt-10 text-white text-bold'>
				{" "}
				Enter the products information
			</h1>
			<form
				ref={refForm}
				onSubmit={formAction}>
				<div className='flex flex-col gap-10 bg-white rounded-lg mt-16 p-16 max-w-4xl mx-10 sm:mx-20 lg:mx-40 xl:mx-auto duration-700'>
					<div className='flex flex-col gap-3'>
						<input
							required
							name='name'
							type='text'
							className='text-xl rounded-lg ring-1 ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-xl p-3 mt-7'
							placeholder="Enter the product's name"
						/>
					</div>

					<hr className='w-[80%]  border-1 bg-gray-300 mx-auto mt-4 ' />

					<div className='flex flex-col gap-3'>
						<textarea
							required
							name='description'
							className='text-xl rounded-lg ring-1 ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-800 shadow-xl p-3'
							placeholder={"Enter the product's description"}
						/>
					</div>
					<hr className='w-[60%]  border-1 bg-gray-300 mx-auto mt-4' />

					{/*CATEGORIAS*/}

					<select
						required
						name='category'
						id='selectCreateProduct'
						className=' inline-block mx-auto cursor-pointer p-2 ring-1 ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-800 shadow-xl rounded-lg '
						defaultValue={"Default"}>
						<option
							className='py-10 my-10'
							value={"Default"}
							disabled>
							Select a category
						</option>
						<option
							value={"pizza"}
							className='text-center'>
							Pizza
						</option>
						<option
							value={"burguer"}
							className='text-center'>
							Burguer
						</option>
						<option
							value={"drink"}
							className='text-center'>
							Drinks
						</option>
						<option
							value={"spaggettis"}
							className='text-center'>
							Spaggettis
						</option>
						<option
							value={"combo"}
							className='text-center'>
							Combo
						</option>
					</select>
					<hr className='w-[40%]  border-1 bg-gray-300 mx-auto mt-4' />
					<div className='inline-flex justify-center'>
						<h2 className='text-xl text-center mt-2 text-indigo-500'>
							{" "}
							Choose an image:
						</h2>
						<input
							type='file'
							id='image'
							name='image'
							className='hidden'
							required
						/>
						<div className='flex'>
							<label
								htmlFor='image'
								className=' ml-2 cursor-pointer'>
								<MdImageSearch
									size={36}
									color='darkblue'
									className='hover:size-10 duration-700'
								/>
							</label>
						</div>
					</div>
					<hr className='w-[20%]  border-1 bg-gray-300 mx-auto mt-4' />
					<div className='flex justify-center items-center gap-2'>
						<h2 className='text-xl text-center mt-2 text-indigo-500'>
							{" "}
							Price:
						</h2>
						<input
							type='number'
							name='price'
							defaultValue={5}
							className='text-xl rounded-md ring-1 ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-800 p-1 max-w-16 mt-2'
							min={1}
							max={50}
						/>
					</div>
					<div className='flex flex-col sm:flex-row justify-end mt-16 gap-10'>
						<button
							type='submit'
							className='bg-green-400 hover:bg-green-500 rounded-lg p-2 text-white hover:scale-110 duration-700 min-w-32'>
							{isPending ? "Adding..." : "Create Product"}
						</button>
						<button
							onClick={(e) => {
								e.preventDefault(), refForm.current?.reset()
							}}
							className='bg-red-400 hover:bg-red-500 rounded-lg p-2 text-white hover:scale-110 duration-700 min-w-32'>
							Clear Data
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default Form
