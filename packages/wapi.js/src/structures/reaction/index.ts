import { type z } from 'zod'
import { type WhatsappCloudApiRequestPayloadSchemaType } from '../../api-request-payload-schema'
import { BaseMessage } from '../message'
import { MessageTypeEnum } from '../message/types'
import { type ReactionMessageInterface } from './interface'

/**
 * Represents a reaction message.
 * @class
 * @extends {BaseMessage<MessageTypeEnum.Reaction>}
 * @implements {ReactionMessageInterface}
 */
export class ReactionMessage
	extends BaseMessage<MessageTypeEnum.Reaction>
	implements ReactionMessageInterface
{
	data: {
		messageId: string
		emoji: string
	}

	/**
	 * Creates a new instance of ReactionMessage.
	 * @constructor
	 * @memberof ReactionMessage
	 * @param {object} params - The parameters for creating the reaction message.
	 * @param {string} params.messageId - The ID of the message to react to.
	 * @param {string} params.emoji - The emoji to use as a reaction.
	 */
	constructor(params: { messageId: string; emoji: string }) {
		super({ type: MessageTypeEnum.Sticker })
		this.data = params
	}

	/**
	 * Converts the reaction message to a JSON object.
	 * @memberof ReactionMessage
	 * @param {object} params - The parameters for converting the reaction message to JSON.
	 * @param {string} params.to - The recipient of the reaction message.
	 * @returns {object} - The JSON representation of the reaction message.
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
