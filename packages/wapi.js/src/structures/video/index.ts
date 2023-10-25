import { type VideoMessageInterface } from './interface'
import { MessageTypeEnum } from '../message/types'
import { BaseMessage } from '../message'

export class VideoMessage extends BaseMessage implements VideoMessageInterface {
	readonly data: { id: string | null; link: string | null; caption?: string | undefined }

	constructor(props: {id: string | null; link: string | null; caption?: string | undefined}) {
		super({ type: MessageTypeEnum.Video })
		this.data = {...props}
	}

	setId() {}

	setLink() {}

	setCaption() {}
}
