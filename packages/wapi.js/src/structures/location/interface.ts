import { type BaseMessageInterface } from '../message/interface'

export interface LocationMessageInterface extends BaseMessageInterface {
	data: {
		latitude: number
		longitude: number
		address: string
		name: string
	}
}
