import { type BaseMessageInterface } from '../message/interface'

export interface VideoMessageInterface extends BaseMessageInterface {
	data: { caption?: string } & (
		| {
				mediaId: string
		  }
		| { link: string }
	)
}
