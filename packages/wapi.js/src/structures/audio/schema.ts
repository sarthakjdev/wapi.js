import { z } from 'zod'

export const AudioMessageConstructorParamSchemaType = z
	.object({ id: z.string() })
	.or(z.object({ link: z.string() }))
