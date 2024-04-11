"use client"
import { FcGoogle } from "react-icons/fc"
import { signIn, useSession } from "next-auth/react"
import { PulseLoader } from "react-spinners"
import { useTransition } from "react"
const GoogleButton = () => {
	const [isPending, startTransition] = useTransition()
	return (
		<button
			onClick={() =>
				startTransition(() => {
					signIn("google")
				})
			}
			className='flex items-center gap-2 mx-auto mb-4 rounded-lg shadow-xl pl-2'>
			<FcGoogle size={25} />
			<span className='bg-red-500 text-white p-2 rounded-r-lg'>
				{isPending ? (
					<PulseLoader
						color='white'
						size={8}
					/>
				) : (
					"Sign in with Google"
				)}
			</span>
		</button>
	)
}

export default GoogleButton
