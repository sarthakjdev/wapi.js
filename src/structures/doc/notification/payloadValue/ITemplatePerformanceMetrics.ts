
/**
 * payload value received from template performance metrics webhook
 * @iterface
 * @export
 */
export interface TemplatePerformaceMetrics {
    /**
     * templates_performance_metrics
     * @memberof TemplatePerformaceMetrics
     */
    templates_performance_metrics: {

        /**
         * template id
         * @type {string}
         */
        template_id: string

        /**
         * template name
         * @type {string}
         */
        template_name: string

        /**
         * template language
         * @type {string}
         */
        template_language: string

        /**
         * message sent 7d
         * @type {number}
         */
        message_sent_7d: number

        /**
         * message read 7d
         * @type {number}
         */
        message_read_7d: number

        /**
         * top block reason
         * @type {string}
         */
        top_block_reason: string
    }
}
