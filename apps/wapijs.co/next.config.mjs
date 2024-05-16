/** @type {import('next').NextConfig} */

import BundleAnalyzerPlugin from '@next/bundle-analyzer'
import { withContentlayer } from 'next-contentlayer'

const withBundleAnalyzer = BundleAnalyzerPlugin({
	enabled: process.env.ANALYZE === 'true'
})

const nextConfig = withBundleAnalyzer(
	withContentlayer({
		reactStrictMode: true,
		compiler: {
			removeConsole: process.env.NODE_ENV === 'production'
		},
		poweredByHeader: false
	})
)

export default nextConfig
