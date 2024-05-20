/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production'
	},
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com'
			},
			{
				hostname: 'www.producthunt.com'
			},
			{
				hostname: 'api.producthunt.com'
			}
		]
	}
}

export default nextConfig
