import { Context } from './doc/IContext'
import { MessageType } from './doc/IMessageType'

/**
 * parent class to construct message componet
 * @class
 * @export
 */
export class Component {
    /**
     * Required if replying to any message in the conversation. Only used for Cloud API.
     * @memberof Component
     */
    context: Context

    /**
     * type of the message you want to send
     *  @memberof Component
     */
    type: MessageType

    /**
     * type of user you are sending the message, as for now individual is available only
     * @memberof Component
     */
    recipent_type: string

    /**
     *  Messaging service used for the request. Use "whatsapp".
     * @memberof Component
     */
    messaging_product = 'whatsapp'

    /**
     * A message's status. You can use this field to mark a message as read.
     * @memberof Component
     */
    status: string

    /**
     * whatsapp-id or phone number you want send the message to
     * @memberof Component
     */
    to: string

    /**
     * constructor to create an instance of contact
     * @param {Component} options
     */
    constructor(options: Component) {
        this.context = options.context
        this.type = options.type
        this.recipent_type = options.recipent_type || 'individual'
        this.status = options.status
        this.to = options.to
    }
}
