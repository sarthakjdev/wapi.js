import { type TextMessageEvent } from './events/text'
import { type AudioMessageEvent } from './events/audio'
import { type ImageMessageEvent } from './events/image'
import { type DocumentMessageEvent } from './events/document'
import { type LocationMessageEvent } from './events/location'
import { type StickerMessageEvent } from './events/sticker'
import { type VideoMessageEvent } from './events/video'
import {
	type QuickReplyButtonInteractionEvent,
	type ReplyButtonInteractionEvent,
	type AdInteractionEvent,
	type ListInteractionEvent
} from './events/interaction'
import { type ContactMessageEvent } from './events/contacts'
import { type ReactionEvent } from './events/reaction'
import { type OrderMessageEvent } from './events/order'
import { type MessageUndeliveredEvent } from './events/message-undelivered'
import { type MessageSentEvent } from './events/message-sent'
import { type MessageReadEvent } from './events/message-read'
import { type MessageFailedEvent } from './events/message-failed'
import { type MessageDeliveryEvent } from './events/message-delivered'
import { type CustomerIdentityChangeEvent } from './events/customer-identity-changed'
import { type CustomerNumberChangeEvent } from './events/customer-number-changed'
import { type ProductInquiryEvent } from './events/product-inquiry'
import { type UnknownEvent } from './events/unknown'

export enum NotificationEventTypeEnum {
	TextMessage = 'TextMessage',
	AudioMessage = 'AudioMessage',
	VideoMessage = 'VideoMessage',
	StickerMessage = 'StickerMessage',
	DocumentMessage = 'DocumentMessage',
	LocationMessage = 'LocationMessage',
	ImageMessage = 'ImageMessage',
	ContactsMessage = 'ContactsMessage',
	OrderReceived = 'OrderReceived',
	ButtonInteraction = 'ButtonInteraction',
	ListInteraction = 'ListInteraction',
	CustomerNumberChanged = 'CustomerNumberChanged',
	CustomerIdentityChanged = 'CustomerIdentityChanged',
	UnknownEvent = 'UnknownEvent',
	MessageSent = 'MessageSent',
	MessageDelivered = 'MessageDelivered',
	MessageRead = 'MessageRead',
	Reaction = 'Reaction',
	AdInteraction = 'AdInteraction',
	ProductInquiry = 'ProductInquiry',
	MessageDeleted = 'MessageDeleted',
	MessageFailed = 'MessageFailed',
	MessageUndelivered = 'MessageUndelivered',
	ReplyMessage = 'ReplyMessage'
}

export enum NotificationMessageTypeEnum {
	Contacts = 'contacts',
	Text = 'text',
	Audio = 'audio',
	Video = 'Video',
	Document = 'document',
	Order = 'order',
	Sticker = 'sticker',
	Image = 'image',
	System = 'system',
	Location = 'location',
	Unknown = 'unknown',
	Interactive = 'interactive',
	Reaction = 'reaction',
	Button = 'button'
}

export enum InteractionNotificationTypeEnum {
	ListReply = 'list_reply',
	ButtonReply = 'button_reply'
}

export enum MessageStatusEnum {
	Sent = 'sent',
	Failed = 'failed',
	Delivered = 'delivered',
	Read = 'read'
}

export enum MessageStatusCategoryEnum {
	Authentication = 'authentication',
	Marketing = 'marketing',
	Utility = 'utility',
	Service = 'service',
	ReferralConversion = 'referral_conversion'
}

export enum SystemNotificationTypeEnum {
	CustomerNumberChange = 'user_changed_number',
	CustomerIdentityChange = 'customer_identity_changed'
}

export type WapiEventDataMap = {
	TextMessage: TextMessageEvent
	AudioMessage: AudioMessageEvent
	AdInteraction: AdInteractionEvent
	ContactsMessage: ContactMessageEvent
	QuickReplyButtonInteraction: QuickReplyButtonInteractionEvent
	ReplyButtonInteraction: ReplyButtonInteractionEvent
	CustomerIdentityChanged: CustomerIdentityChangeEvent
	CustomerNumberChanged: CustomerNumberChangeEvent
	DocumentMessage: DocumentMessageEvent
	ImageMessage: ImageMessageEvent
	ListInteraction: ListInteractionEvent
	LocationMessage: LocationMessageEvent
	MessageDelivered: MessageDeliveryEvent
	MessageFailed: MessageFailedEvent
	MessageRead: MessageReadEvent
	MessageSent: MessageSentEvent
	MessageUndelivered: MessageUndeliveredEvent
	OrderReceived: OrderMessageEvent
	ProductInquiry: ProductInquiryEvent
	Reaction: ReactionEvent
	StickerMessage: StickerMessageEvent
	UnknownEvent: UnknownEvent
	VideoMessage: VideoMessageEvent
	['Error']: Error
	['Warn']: string
	['Ready']: null
}
