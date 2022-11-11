import { Message } from './doc/message/IMessage'
import { MessageType } from './doc/IMessageType'

/**
 * parent class to construct message component
 * @class
 * @export
 */
export abstract class MessageComponent {
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
     * constructor to create an instance of contact
     * @constructor
     * @param {Component} options
     * @memberof Component
     */
    constructor(data?: Message) {
        if (this.status) {
            this.status = data.status
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

    public setRecipent(recipentNumber: string): this {
        this.to = recipentNumber

        return this
    }
}
