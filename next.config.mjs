/** @type {import('next').NextConfig} */
const nextConfig = {
	
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "**",
			},
		],
	},
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
	},
}

export default nextConfig
