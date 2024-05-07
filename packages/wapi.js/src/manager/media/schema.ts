import { z } from 'zod'

/**
 * Represents the schema for the response body of the GetMediaUrl API.
 */
export const GetMediaUrlResponseBodySchemaType = z.object({
	url: z.string(),
	mime_type: z.string(),
	sha256: z.string(),
	file_size: z.number(),
	id: z.string(),
	messaging_product: z.literal('whatsapp')
})
