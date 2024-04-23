import { z } from 'zod'

export const GetMediaUrlResponseBodySchemaType = z.object({
	url: z.string(),
	mime_type: z.string(),
	sha256: z.string(),
	file_size: z.number(),
	id: z.string(),
	messaging_product: z.literal('whatsapp')
})
