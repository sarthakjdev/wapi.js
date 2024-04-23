export enum MediaTypeEnum {
	Audio = 'audio',
	Image = 'image',
	Sticker = 'sticker',
	Document = 'document',
	Video = 'video'
}

import { type z } from 'zod'
import { type BaseMessageInterface } from '../message/interface'
import {
	type ExternalVideoMediaObjectType,
	type MetaVideoMediaObjectSchemaType,
	type ExternalAudioMediaObjectType,
	type MetaAudioMediaObjectSchemaType,
	type MetaStickerMediaObjectSchemaType,
	type ExternalStickerMediaObjectType,
	type MetaDocumentMediaObjectSchemaType,
	type ExternalDocumentMediaObjectSchemaType,
	type ExternalImageMediaObjectType,
	type MetaImageMediaObjectSchemaType
} from './schema'

export interface MediaMessageInterface {
	type: MediaTypeEnum
	fileName?: string
	link?: string
	id?: string
	caption?: string
}

export interface AudioMessageInterface extends BaseMessageInterface {
	data: z.infer<typeof MetaAudioMediaObjectSchemaType | typeof ExternalAudioMediaObjectType>
}

export interface VideoMessageInterface extends BaseMessageInterface {
	data: z.infer<typeof MetaVideoMediaObjectSchemaType | typeof ExternalVideoMediaObjectType>
}

export interface ImageMessageInterface extends BaseMessageInterface {
	data: z.infer<typeof MetaImageMediaObjectSchemaType | typeof ExternalImageMediaObjectType>
}

export interface StickerMessageInterface extends BaseMessageInterface {
	data: z.infer<typeof MetaStickerMediaObjectSchemaType | typeof ExternalStickerMediaObjectType>
}

export interface DocumentMessageInterface extends BaseMessageInterface {
	data: z.infer<
		typeof MetaDocumentMediaObjectSchemaType | typeof ExternalDocumentMediaObjectSchemaType
	>
}
