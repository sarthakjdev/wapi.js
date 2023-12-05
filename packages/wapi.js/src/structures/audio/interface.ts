import { type BaseMessageInterface } from '../message/interface'

export interface AudioMessageInterface extends BaseMessageInterface {
	data: { mediaId: string } | { link: string }
}
