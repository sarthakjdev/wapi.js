import { type LocationMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'
import { type LocationSchemaType } from '../message/schema'
import { type z } from 'zod'

export class LocationMessage extends BaseMessage implements LocationMessageInterface {
	address?: string | undefined
	latitude: number
	longitude: number
	name?: string | undefined

	constructor(params: z.infer<typeof LocationSchemaType>) {
		super({ type: MessageTypeEnum.Location })

		this.latitude = params.latitude
		this.longitude = params.longitude
		this.address = params.address
		this.name = params.name
	}
}
