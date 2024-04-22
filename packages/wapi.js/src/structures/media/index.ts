import { type z } from 'zod'
import { type MediaTypeEnum, type MediaComponentInterface } from './interface'
import { MediaObjectSchemaType } from './schema'

export class MediaComponent implements MediaComponentInterface {
	type: MediaTypeEnum
	fileName?: string
	link?: string
	id?: string
	caption?: string

	private static schema = MediaObjectSchemaType

	protected static parseConstructorPayload(payload: any) {
		const response = MediaComponent.schema.safeParse(payload)
		if (!response.success) {
			throw new Error(
				JSON.stringify(
					{
						type: 'Parsing Error',
						errors: response.error.errors
					},
					null,
					4
				)
			)
		} else {
			return response.data
		}
	}

	constructor(params: z.infer<typeof MediaObjectSchemaType>) {
		this.type = params.type
		MediaComponent.parseConstructorPayload(params)
		Object.entries(params).map(([key, value]) => {
			// ! TODO: fix types
			// @ts-expect-error type error
			this[key] = value
		})
	}
}
