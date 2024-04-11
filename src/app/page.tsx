import Image from "next/image"
import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import ComboProducts from "./components/ComboProducts"
import Categories from "./components/Categories"
import AboutUs from "./components/AboutUs"

export default function Home() {
	return (
		<>
			<div className='absolute top-0 w-[100vw] h-[100vh] -z-10'>
				<Image
					src='/font-dark-hero.jpg'
					alt='background-image'
					fill={true}
					className='object-cover  rounded-bl-full'
				/>
			</div>
			<Hero />
			<ComboProducts />
			<Categories />
			<AboutUs />
		</>
	)
}
