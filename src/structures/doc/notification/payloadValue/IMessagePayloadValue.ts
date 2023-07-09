import { type AudioPayload } from '../IAudioPayload'
import { type ButtonPayload } from '../IButtonPayload'
import { type DocumentPayload } from '../IDocumentPayload'
import { type IdentityPayload } from '../IIdentity'
import { type ImagePayload } from '../IImagePayload'
import { type StickerPayload } from '../IStickerPayload'
import { type TextPayload } from '../ITextPayload'
import { type SystemPayload } from '../ISystemPayload'
import { type VideoPayload } from '../IVideoPayload'
import { type NotificationContext } from '../INotificationContext'
import { type UserInteraction } from '../IUserInteraction'
import { type CustomerOrder } from '../ICustomerOrder'
import { type Referral } from '../IReferral'
import { type NotificationMessageTypeEnum } from '../INotificationPayloadType'

export interface MessagePaylaodValue {
	contacts: {
		wa_id: string
		profile: {
			name: string
		}
	}
	messages: PayloadMessage[]
	errors: MessageError[]
	statuses: PayloadStatuses[]
}

interface MessageError {
	code: string
	title: string
}

export interface PayloadMessage {
	audio?: AudioPayload
	button?: ButtonPayload
	context: NotificationContext
	document: DocumentPayload
	errors: MessageError[]
	from: string
	id: string
	identity: IdentityPayload
	image: ImagePayload
	interactive: UserInteraction
	order: CustomerOrder
	referral: Referral
	sticker: StickerPayload
	system: SystemPayload
	text: TextPayload
	timestamp: string
	type: NotificationMessageTypeEnum
	video: VideoPayload
}

export interface PayloadStatuses {
	conversation: {
		id: string
		origin: {
			type: ConversationEntryPointEnum
		}
		expiration_timestamp: string
	}
	id: string
	pricing: {
		category: ConversationEntryPointEnum
		pricing_model: string
	}
	recipient_id: string
	status: MessageStatusEnum
	timestamp: string
}

export enum MessageStatusEnum {
	'delivered',
	'read',
	'sent'
}

enum ConversationEntryPointEnum {
	'business_initiated',
	'customer_initiated',
	'referral_conversion'
}
