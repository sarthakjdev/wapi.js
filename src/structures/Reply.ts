import { Context } from './doc/IContext'
import { TextMessageComponent } from './Text'

export class Reply extends TextMessageComponent {
    /**
     * Required if replying to any message in the conversation. Only used for Cloud API.
     * @type {Context}
     * @memberof Component
     */
    private context?: Context

    /**
     * set the context of the message component, to be used when sending a reply
     * @param {Context} context
     * @returns {this}
     */
    public setContext(context: Context): this {
        this.context = context

        return this
    }
}
