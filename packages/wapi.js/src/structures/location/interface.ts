import { type BaseMessageInterface } from '../message/interface'

export interface LocationMessageInterface extends BaseMessageInterface {
	data: {
		address?: string
		latitude: number
		longitude: number
		name?: string
	}
}
