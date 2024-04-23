import { z } from 'zod'

export const LocationSchemaType = z.object({
	latitude: z.number(),
	longitude: z.number(),
	name: z.string().optional(),
	address: z.string().optional()
})
