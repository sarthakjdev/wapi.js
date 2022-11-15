import { Message } from './doc/message/IMessage'
import { MessageType } from './doc/IMessageType'
import { Context } from './doc/IContext'

/**
 * parent class to construct message component
 * @class
 * @export
 */
export class MessageComponent {
    /**
     * type of the message you want to send
     * @type {MessageType}
     *  @memberof Component
     */
    protected type: MessageType

    /**
     * type of user you are sending the message, as for now individual is available only
     * @type {string}
     * @memberof Component
     */
    private recipent_type? = 'individual'

    /**
     * Messaging service used for the request. Use "whatsapp".
     * @type {string}
     * @memberof Component
     */
    private messaging_product? = 'whatsapp'

    /**
     * A message's status. You can use this field to mark a message as read.
     * @type {string}
     * @memberof Component
     */
    private status?: string

    /**
     * whatsapp-id or phone number you want send the message to
     * @type {string}
     * @memberof Component
     */
    private to: string

    /**
     * conversation context, required if replying to a message or marking a messagge as read
     */
    private context?: Context

    /**
     * set the context of the message for either defining the conversation context
     * or mark a message as read
     * @setter
     * @memberof MessageComponent
     */
    public set setMessageContext(messageId) {
        this.context = {
            mnessage_id: messageId,
        }
    }

    /**
     * constructor to create an instance of contact
     * @constructor
     * @param {Component} options
     * @memberof Component
     */
    constructor(data?: Message) {
        if (data.status) {
            this.status = data.status
        }
        if (data.context) {
            this.context = data.context
        }
    }

    /**
     * set the type of message component
     * @param {MessageType} type
     * @returns {this}
     */
    public setType(type: MessageType): this {
        this.type = type

        return this
    }

    /**
     * set the status of the message e.g: read
     * @param {string} status
     * @returns {this}
     */
    public setStatus(status: string): this {
        this.status = status

        return this
    }

    /**
     * set the recipent of the component
     * @param {string} recipentNumber
     * @returns
     */
    public setRecipent(recipentNumber: string): this {
        this.to = recipentNumber

        return this
    }

    public get getRecipent() {
        return this.to
    }
}
