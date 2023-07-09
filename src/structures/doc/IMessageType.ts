/**
 * type of message received, if the notification received of type message
 * @enum
 * @export
 */
export enum MessageTypeEnum {
	Text = 'text',
	Audio = 'audio',
	Video = 'video',
	Document = 'document',
	Contacts = 'contacts',
	Image = 'image',
	Interactive = 'interactive',
	Location = 'location',
	Sticker = 'sticker',
	Template = 'template',
	Reaction = 'reaction'
}
