import { type BaseMessageInterface } from '../message/interface'

export interface LocationMessageInterface extends BaseMessageInterface {
	latitude: number
	longitude: number
	address?: string
	name?: string
}
