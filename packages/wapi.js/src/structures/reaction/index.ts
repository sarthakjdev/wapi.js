import { type z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import { BaseMessage } from '../message'
import { MessageTypeEnum } from '../message/types'
import { type ReactionMessageInterface } from './interface'

export class ReactionMessage extends BaseMessage<'reaction'> implements ReactionMessageInterface {
    data: {
        messageId: string,
        emoji: string
    }

    /**
     * @constructor
     * @memberof ReactionMessage
     */
    constructor(
        params: {
            messageId: string,
            emoji: string
        }
    ) {
        super({ type: MessageTypeEnum.Sticker })
        this.data = params
    }

    /**
     * @memberof ReactionMessage
     */
    toJson(params: {
        to: string
    }): Extract<
        z.infer<typeof WhatsappCloudApiRequestPayloadSchemaType>,
        { type: MessageTypeEnum.Reaction }
    > {
        return {
            type: MessageTypeEnum.Reaction,
            to: params.to,
            messaging_product: this.messaging_product,
            recipient_type: this.recipient_type,
            reaction: {
                message_id: this.data.messageId,
                emoji: this.data.emoji
            }
        }
    }
}
