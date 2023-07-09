import { type Media } from '../IMedia'

/**
 * interactive component header interface
 * @interface
 */
export interface Header {
	/**
	 * document to send in the header of interactive message
	 * @memberof Header
	 */
	document?: Media

	/**
	 * image to send in the header of interactive message
	 * @memberof Header
	 */
	image?: Media

	/**
	 * text to send in the header of interactive message
	 * @memberof Header
	 */
	text?: string

	/**
	 * document to send in the header of interactive message
	 * @type {HeaderTypeEnum}
	 * @memberof Header
	 */
	type: HeaderTypeEnum

	/**
	 * document to send in the header of interactive message
	 * @memberof Header
	 */
	video: Media
}

enum HeaderTypeEnum {
	Text = 'text',
	Video = 'video',
	Image = 'image',
	Document = 'document'
}
