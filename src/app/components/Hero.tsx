
import Link from "next/link"


const Hero = () => {
	
	
	return (
		<div className='flex flex-col w-[450px] h-[300px] duration-500 ml-8 sm:ml-48 mt-28 text-white'>
			<div className='bg-slate-100 bg-opacity-20 rounded-xl'>
				<h1 className='text-5xl text-left font-hero p-5'>
					Here you eat like at home...But without washing the dishes.
				</h1>
				<h1 className='text-5xl text-right font-hero p-5'>
					Ceo of Gr00t Enterprise
				</h1>
			</div>
			<div className='flex justify-end mt-4'>
				<Link
					className='bg-slate-100 bg-opacity-20 p-2 rounded-lg animate-bounce duration-500 hover:animate-none font-candara'
					href={"/Menu"}>
					Get Started
				</Link>
			</div>
		</div>
	)
}

export default Hero
