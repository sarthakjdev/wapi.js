import { type BaseMessageInterface } from '../message/interface'

export interface VideoMessageInterface extends BaseMessageInterface {
	data: {
		id: string | null
		link: string | null
		caption?: string
	}
}
