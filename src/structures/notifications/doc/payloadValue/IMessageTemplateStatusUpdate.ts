
/**
 * payload received from message template status update webhook
 */
export interface MessageTemplateStatusUpdate {
    /**
     * event
     * @type {string}
     */
    event: string

    /**
     * message template id
     * @type {number}
     */
    message_template_id: number

    /**
     * message_template_name
     * @type {string}
     */
    message_template_name: string

    /**
     * message_template_language
     * @type {string}
     */
    message_template_language: string

    /**
     * reason
     * @type {string}
     */
    reason: string

    /**
     * disable_info
     */
    disable_info: {
        /**
         * disable_date
         * @type {string}
         */
        disable_date: string
    }

    /**
     * other info
     */
    other_info: {
        /**
         * title
         * @type {string}
         */
        title: string

        /**
         * description
         * @type {string}
         */
        description: string
    }
}
