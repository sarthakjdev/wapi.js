import { AudioPayload } from '../IAudioPayload'
import { ButtonPayload } from '../IButtonPayload'
import { DocumentPayload } from '../IDocumentPayload'
import { IdentityPayload } from '../IIdentity'
import { ImagePayload } from '../IImagePayload'
import { StickerPayload } from '../IStickerPayload'
import { TextPayload } from '../ITextPayload'
import { SystemPayload } from '../ISystemPayload'
import { VideoPayload } from '../IVideoPayload'
import { NotificationContext } from '../INotificationContext'
import { UserInteraction } from '../IUserInteraction'
import { CustomerOrder } from '../ICustomerOrder'
import { Referral } from '../IReferral'
import { NOTIFICATION_MESSAGE_TYPE } from '../INotificationPayloadType'

export interface MessagePaylaodValue {
    contacts: {
        wa_id: string
        profile: {
            name: string
        }

    }
    messages: PayloadMessage[]
    errors: MessageError[],
    statuses: PayloadStatuses[]

}

interface MessageError {
    code: string
    title: string
}

export interface PayloadMessage {
    audio?: AudioPayload,
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
    type: NOTIFICATION_MESSAGE_TYPE
    video: VideoPayload
}

export interface PayloadStatuses {
    conversation: {
        id: string,
        origin: {
            type: CONVERSATION_ENTRY_POINT
        },
        expiration_timestamp: string
    },
    id: string,
    pricing: {
        category: CONVERSATION_ENTRY_POINT,
        pricing_model: string
    },
    recipient_id: string,
    status: MESSAGE_STATUS,
    timestamp: string
}

export enum MESSAGE_STATUS {
    'delivered',
    'read',
    'sent',
}

enum CONVERSATION_ENTRY_POINT {
    'business_initiated',
    'customer_initiated',
    'referral_conversion',
}
