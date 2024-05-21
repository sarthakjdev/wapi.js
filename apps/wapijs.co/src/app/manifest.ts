import { type MetadataRoute } from 'next'
import { metaDescription } from '~/constant'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Wapi.js',
		short_name: 'Wapi',
		description: metaDescription,
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#25D366',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon'
			}
		]
	}
}
