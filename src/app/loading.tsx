import Image from "next/image"
export default function Loading() {
	return (
		<>
			<div className='bg-gradient-to-b from-slate-500 h-[300px] w-full fixed top-0 -z-10'></div>
			<div className='bg-gradient-to-t from-slate-500 h-[300px] w-full fixed bottom-0 -z-10'></div>
			<div className='flex flex-col justify-center items-center mt-20'>
				<Image
					src={"/waiting.png"}
					alt={"loading Image"}
					className='object-contain'
					width={400}
					height={400}
				/>
				<h1 className='text-center font-hero text-4xl font-bold text-slate-700'>
					Loading...
				</h1>
			</div>
		</>
	)
}
