import { type z } from 'zod'
import { ButtonBuilderParamsSchemaType } from './schema'

export class Button {
	private static schema = ButtonBuilderParamsSchemaType

	constructor(params: z.infer<typeof ButtonBuilderParamsSchemaType>) {
		params
	}
}
