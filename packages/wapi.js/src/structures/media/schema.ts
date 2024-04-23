import { z } from 'zod'

export const ExternalMediaObjectType = z.object({
	link: z.string()
})

export const MetaMediaObjectType = z.object({
	id: z.string()
})

export const MetaAudioMediaObjectSchemaType = MetaMediaObjectType

export const ExternalAudioMediaObjectType = ExternalMediaObjectType

export const MetaImageMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		caption: z.string().optional()
	})
)

export const ExternalImageMediaObjectType = ExternalMediaObjectType.merge(
	z.object({
		caption: z.string().optional()
	})
)

export const MetaDocumentMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		caption: z.string().optional(),
		filename: z.string().optional()
	})
)

export const ExternalDocumentMediaObjectSchemaType = ExternalMediaObjectType.merge(
	z.object({
		caption: z.string().optional(),
		filename: z.string().optional()
	})
)

export const MetaVideoMediaObjectSchemaType = MetaMediaObjectType.merge(
	z.object({
		caption: z.string().optional()
	})
)

export const ExternalVideoMediaObjectType = ExternalMediaObjectType.merge(
	z.object({
		caption: z.string().optional()
	})
)

export const MetaStickerMediaObjectSchemaType = MetaMediaObjectType

export const ExternalStickerMediaObjectType = ExternalMediaObjectType

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
