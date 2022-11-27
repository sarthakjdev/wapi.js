
/**
 * reaction object to send when reacting to a message
 * @interface
 * @export
 */
export interface Reaction {
    /**
     * message id for context of the message to be reacted
     * @type {string}
     */
    message_id: string

    /**
     * emoji to react
     * @type {string}
     */
    emoji: string
}
