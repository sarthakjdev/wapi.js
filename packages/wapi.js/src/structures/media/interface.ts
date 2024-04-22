export enum MediaTypeEnum {
	Audio = 'audio',
	Image = 'image',
	Sticker = 'sticker',
	Document = 'document',
	Video = 'video'
}

export interface MediaComponentInterface {
	type: MediaTypeEnum
	fileName?: string
	link?: string
	id?: string
	caption?: string
}
