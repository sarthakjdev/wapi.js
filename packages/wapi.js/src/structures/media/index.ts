import { type z } from 'zod'
import {
	type ImageMessageInterface,
	type AudioMessageInterface,
	type VideoMessageInterface,
	type StickerMessageInterface,
	type DocumentMessageInterface
} from './interface'
import {
	type MetaAudioMediaObjectSchemaType,
	type ExternalAudioMediaObjectType,
	type ExternalVideoMediaObjectType,
	type MetaVideoMediaObjectSchemaType,
	type MetaImageMediaObjectSchemaType,
	type ExternalImageMediaObjectType,
	type ExternalDocumentMediaObjectSchemaType,
	type MetaDocumentMediaObjectSchemaType,
	type ExternalStickerMediaObjectType,
	type MetaStickerMediaObjectSchemaType
} from './schema'
import { BaseMessage } from '../message'
import { MessageTypeEnum } from '../message/types'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'

/**
 * @extends {BaseMessage<MessageTypeEnum.Audio>}
 * @implements {AudioMessageInterface}
 * @class
 */
export class AudioMessage
	extends BaseMessage<MessageTypeEnum.Audio>
	implements AudioMessageInterface
{
	data: z.infer<typeof MetaAudioMediaObjectSchemaType | typeof ExternalAudioMediaObjectType>

	/**
	 * @constructor
	 * @memberof AudioMessage
	 */
	constructor(
		params: z.infer<typeof MetaAudioMediaObjectSchemaType | typeof ExternalAudioMediaObjectType>
	) {
		super({ type: MessageTypeEnum.Audio })
		this.data = params
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof TextMessage
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Audio }
	> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			type: MessageTypeEnum.Audio,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			audio: {
				...('id' in this.data ? { id: this.data.id } : { link: this.data.link })
			}
		}
	}
}

/**
 * @extends {BaseMessage<MessageTypeEnum.Video>}
 * @implements {VideoMessageInterface}
 * @class
 */
export class VideoMessage
	extends BaseMessage<MessageTypeEnum.Video>
	implements VideoMessageInterface
{
	data: z.infer<typeof MetaVideoMediaObjectSchemaType | typeof ExternalVideoMediaObjectType>

	/**
	 * @constructor
	 * @memberof VideoMessage
	 */
	constructor(
		params: z.infer<typeof MetaVideoMediaObjectSchemaType | typeof ExternalVideoMediaObjectType>
	) {
		super({ type: MessageTypeEnum.Video })
		this.data = params
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof VideoMessage
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Video }
	> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			type: MessageTypeEnum.Video,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			video: {
				...('id' in this.data ? { id: this.data.id } : { link: this.data.link }),
				caption: this.data.caption
			}
		}
	}
}

/**
 * @extends {BaseMessage<MessageTypeEnum.Image>}
 * @implements {ImageMessageInterface}
 * @class
 */
export class ImageMessage
	extends BaseMessage<MessageTypeEnum.Image>
	implements ImageMessageInterface
{
	data: z.infer<typeof MetaImageMediaObjectSchemaType | typeof ExternalImageMediaObjectType>

	/**
	 * @constructor
	 */
	constructor(
		params: z.infer<typeof MetaImageMediaObjectSchemaType | typeof ExternalImageMediaObjectType>
	) {
		super({ type: MessageTypeEnum.Image })
		this.data = params
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof VideoMessage
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Image }
	> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			type: MessageTypeEnum.Image,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			image: {
				...('id' in this.data ? { id: this.data.id } : { link: this.data.link }),
				caption: this.data.caption
			}
		}
	}
}

/**
 * @extends {BaseMessage<MessageTypeEnum.Sticker>}
 * @implements {StickerMessageInterface}
 * @class
 */
export class StickerMessage
	extends BaseMessage<MessageTypeEnum.Sticker>
	implements StickerMessageInterface
{
	data: z.infer<typeof MetaStickerMediaObjectSchemaType | typeof ExternalStickerMediaObjectType>

	/**
	 * @constructor
	 * @memberof StickerMessage
	 */
	constructor(
		params: z.infer<
			typeof MetaStickerMediaObjectSchemaType | typeof ExternalStickerMediaObjectType
		>
	) {
		super({ type: MessageTypeEnum.Sticker })
		this.data = params
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof VideoMessage
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Sticker }
	> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			type: MessageTypeEnum.Sticker,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			sticker: {
				...('id' in this.data ? { id: this.data.id } : { link: this.data.link })
			}
		}
	}
}

/**
 * @extends {BaseMessage<MessageTypeEnum.Document>}
 * @implements {DocumentMessageInterface}
 * @class
 */
export class DocumentMessage
	extends BaseMessage<MessageTypeEnum.Document>
	implements DocumentMessageInterface
{
	data: z.infer<
		typeof MetaDocumentMediaObjectSchemaType | typeof ExternalDocumentMediaObjectSchemaType
	>

	/**
	 * @constructor
	 * @memberof DocumentMessage
	 */
	constructor(
		params: z.infer<
			typeof MetaDocumentMediaObjectSchemaType | typeof ExternalDocumentMediaObjectSchemaType
		>
	) {
		super({ type: MessageTypeEnum.Document })
		this.data = params
	}

	/**
	 * Function used to get the get the whatsapp cloud api payload for audio message
	 * @memberof DocumentMessage
	 */
	toJson(params: {
		to: string
		replyToMessageId?: string
	}): Extract<
		z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
		{ type: MessageTypeEnum.Document }
	> {
		return {
			...(params.replyToMessageId
				? { context: { message_id: params.replyToMessageId } }
				: {}),
			type: MessageTypeEnum.Document,
			to: params.to,
			messaging_product: this.messaging_product,
			recipient_type: this.recipient_type,
			document: {
				...('id' in this.data ? { id: this.data.id } : { link: this.data.link }),
				caption: this.data.caption,
				filename: this.data.filename
			}
		}
	}
}
