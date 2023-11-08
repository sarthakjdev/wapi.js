import { type BaseMessageInterface } from '../message/interface'

export interface TextMessageInterface extends BaseMessageInterface {
	data: { text: string | null }
}
