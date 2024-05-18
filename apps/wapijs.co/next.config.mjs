/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production'
	},
	images: {
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com'
			}
		]
	}
}

export default nextConfig
