import { type MetadataRoute } from 'next'
import { metaDescription } from '~/constant'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Softlancer',
		short_name: 'Softlancer',
		description: metaDescription,
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#f16232',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon'
			}
		]
	}
}
