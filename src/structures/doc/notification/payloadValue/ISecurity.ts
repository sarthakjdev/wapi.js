
/**
 * payload value received from security webhook
 * @interface
 * @export
 */
export interface Security {
    /**
     * phone number that triggered the notification
     * @type {string}
     */
    display_phone_number: string

    /**
     * an event happened in a phone number
     * @type {string}
     */
    event: string

    /**
     * id of a business user who requested disable, disabled or updated two-step verification code
     * @type {string}
     */
    requester: string
}
