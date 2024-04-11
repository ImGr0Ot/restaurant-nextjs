import React from "react"

import { FaFacebook } from "react-icons/fa6"
import { AiFillTwitterCircle } from "react-icons/ai"
import { FaTelegram } from "react-icons/fa"
import { AiFillInstagram } from "react-icons/ai"
import Map from "./Map"
const AboutUs = () => {
	return (
		<>
			<div className='fixed bg-gradient-to-t from-slate-500 h-[300px] w-full bottom-0 -z-10'></div>
			<h1 className='font-hero text-center font-bold text-5xl text-slate-700 mt-40 duration-500'>
				{" "}
				About Us
			</h1>
			<div className='flex flex-col lg:flex-row items-center justify-center w-full gap-5 text-slate-700'>
				<div className='flex flex-col gap-5 w-full lg:w-1/2 '>
					<h1 className=' font-bold font-hero lg:text-center text-2xl mt-12 ml-20 md:ml-28 lg:ml-0 duration-500'>
						{" "}
						Gr00t Enterpise Team:{" "}
					</h1>
					<p className='font-candara text-center mt-3 text-xl mx-16 md:mx-24 duration-500'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ea
						molestiae explicabo facere magni eligendi omnis, sequi ratione
						aliquam eaque cupiditate dolore quas adipisci nobis commodi quo
						praesentium voluptatibus consequuntur.
					</p>
					<div className='flex gap-10 mx-auto'>
						<FaFacebook
							color='#5F9EA0'
							size={30}
						/>
						<AiFillTwitterCircle
							color='#5F9EA0'
							size={30}
						/>
						<FaTelegram
							color='#5F9EA0'
							size={30}
						/>
						<AiFillInstagram
							color='#5F9EA0'
							size={30}
						/>
					</div>
				</div>
				<div className='mx-16 mt-10 w-full lg:w-1/2 lg:mt-16 lg:mx-12 duration-500'>
					<Map />
				</div>
			</div>
		</>
	)
}

export default AboutUs
