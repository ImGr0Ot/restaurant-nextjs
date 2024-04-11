import React from "react"
import Image from "next/image"
import Link from "next/link"
const Categories = () => {
	return (
		<>
			<h1 className='font-hero text-left mx-20 font-bold text-5xl text-slate-700 mt-36'>
				{" "}
				Categories
			</h1>
			<div className='mt-20 mx-10 grid md:grid-cols-2 xl:flex gap-14'>
				<Link
					href={`/Menu?${new URLSearchParams({
						cat: "pizza",
					})}`}
					className='bg-red-400 rounded-lg p-5 bg-cover w-full'
					style={{ backgroundImage: "url(/categoryPizza.png)" }}>
					<h1 className=' font-hero text-left text-white font-bold text-2xl w-1/2'>
						Pizza
					</h1>
					<p className='text-center text-white font-candara w-1/2'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
						deserunt vitae autem exercitationem rem eius, quibusdam ducimus
						sequi porro accusantium voluptates facilis illum
					</p>
				</Link>
				<Link
					href={`/Menu?${new URLSearchParams({
						cat: "spaggettis",
					})}`}
					className='bg-green-400 rounded-lg p-5 bg-cover w-full'
					style={{ backgroundImage: "url(/categoryPasta.png)" }}>
					<h1 className=' font-hero text-left text-white font-bold text-2xl w-1/2'>
						Spaguettis
					</h1>
					<p className='text-center text-white font-candara w-1/2'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
						deserunt vitae autem exercitationem rem eius, quibusdam ducimus
						sequi porro accusantium voluptates facilis illum
					</p>
				</Link>

				<Link
					href={`/Menu?${new URLSearchParams({
						cat: "drink",
					})}`}
					className='bg-pink-400 rounded-lg p-5 bg-cover w-full duration-500 transition-all'
					style={{ backgroundImage: "url(/categoryDrink.png)" }}>
					<h1 className=' font-hero text-left text-white font-bold text-2xl w-1/2 '>
						Drinks
					</h1>
					<p className='text-center text-white font-candara w-1/2'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
						deserunt vitae autem exercitationem rem eius, quibusdam ducimus
						sequi porro accusantium voluptates facilis illum
					</p>
				</Link>

				<Link
					href={`/Menu?${new URLSearchParams({
						cat: "burguer",
					})}`}
					className='bg-cyan-400 rounded-lg p-5 bg-cover w-full'
					style={{ backgroundImage: "url(/categoryBurguer.png)" }}>
					<h1 className='font-hero text-left text-white font-bold text-2xl w-1/2'>
						Burger
					</h1>
					<p className='text-center text-white font-candara w-1/2'>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
						deserunt vitae autem exercitationem rem eius, quibusdam ducimus
						sequi porro accusantium voluptates facilis illum
					</p>
				</Link>
			</div>
		</>
	)
}

export default Categories
