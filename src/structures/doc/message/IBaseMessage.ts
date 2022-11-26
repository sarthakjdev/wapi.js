import { Context } from '../IContext'

export interface BaseMessage {

    /**
      * A message's status. You can use this field to mark a message as read.
      * @type {string}
      * @memberof Component
      */
    status?: string

    /**
     * conversation context, required if replying to a message or marking a message as read
     * @type {Context}
     * @memberof Message
     */
    context?: Context

}
