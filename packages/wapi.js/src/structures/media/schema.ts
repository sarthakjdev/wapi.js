import { z } from 'zod'
import { MediaTypeEnum } from './interface'

export const ExternalMediaObjectType = z.object({
	type: z.nativeEnum(MediaTypeEnum),
	link: z.string()
})

export const MetaMediaObjectType = z.object({
	type: z.nativeEnum(MediaTypeEnum),
	id: z.string()
})

export const MetaAudioMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Audio)
	})
)

export const ExternalAudioMediaObjectType = ExternalMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Audio)
	})
)

export const MetaImageMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Image),
		caption: z.string().optional()
	})
)

export const ExternalImageMediaObjectType = ExternalMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Image),
		caption: z.string().optional()
	})
)

export const MetaDocumentMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Document),
		caption: z.string(),
		filename: z.string().optional()
	})
)

export const ExternalDocumentMediaObjectSchemaType = ExternalMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Document),
		caption: z.string(),
		filename: z.string().optional()
	})
)

export const MetaVideoMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Video),
		caption: z.string().optional()
	})
)

export const ExternalVideoMediaObjectType = ExternalMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Video),
		caption: z.string().optional()
	})
)

export const MetaStickerMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Sticker)
	})
)

export const ExternalStickerMediaObjectType = ExternalMediaObjectType.merge(
	z.object({
		type: z.literal(MediaTypeEnum.Sticker)
	})
)

export const MediaObjectSchemaType = z.union([
	ExternalDocumentMediaObjectSchemaType,
	MetaDocumentMediaObjectSchemaType,
	ExternalStickerMediaObjectType,
	MetaStickerMediaObjectSchemaType,
	ExternalAudioMediaObjectType,
	MetaAudioMediaObjectSchemaType,
	ExternalVideoMediaObjectType,
	MetaVideoMediaObjectSchemaType,
	ExternalImageMediaObjectType,
	MetaImageMediaObjectSchemaType
])
