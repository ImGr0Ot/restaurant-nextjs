"use client"
import Carousel, { ResponsiveType, StateCallBack } from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Price } from "./Price"
import Product from "@/models/product.model"
import { connectDB } from "@/utils/mongoose"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ProductType } from "@/utils/types"
import { getProducts } from "../actions"
import { useEffect, useState } from "react"

const ComboProducts = () => {
	const [products, setProducts] = useState<ProductType[]>([])
	const router = useRouter()
	const responsive = {
		mobile: {
			breakpoint: { max: 3000, min: 0 },
			items: 1,
		},
	}
	const getComboProducts = async () => {
		setProducts(await getProducts())
		}
	 
	useEffect( () => {
		
		getComboProducts()
		},[])
	
		

	return (<>
		<div className='flex flex-col mt-72 text-slate-500'>
			<h1 className='font-bold text-5xl text-slate-700 text-left mx-20 font-hero'>
				Our favorites combos:
			</h1>
			</div>
		
			{<Carousel
				responsive={responsive}
				showDots={true}
				autoPlay={true}
				infinite={true}
				autoPlaySpeed={5000}
				transitionDuration={200}
				containerClass='carousel-container'>
				{products?.length > 0 &&
					products.map((product) => (
						<div
							key={product._id as string}
							className='flex flex-col lg:flex-row rounded-xl mt-5 text-slate-700'>
							<div className='lg:flex-1 lg:ml-40 relative h-[600px] max-w-screen-lg'>
								<Image
									src={product.imgUrl as string}
									alt={"hero photo"}
									fill
									className='rounded-xl object-contain'
								/>
							</div>
							<div className='flex lg:flex-1 flex-col justify-center'>
								<div className='flex flex-col items-center lg:mr-16'>
									<h1 className='text-4xl font-hero'>
										{" "}
										<span className='font-bold'>{product.name}</span>
									</h1>
									<p className='mt-5  mx-10  max-w-lg text-center font-candara'>
										{product.description}
									</p>
								</div>
								<div className='flex flex-col items-center lg:items-start justify-center p-10 lg:ml-10'>
									<Price product={product} />
									<div className='mt-5'></div>
								</div>
							</div>
						</div>
					))}
			</Carousel> || router.push("/")}
		
			</>)
}

export default ComboProducts
