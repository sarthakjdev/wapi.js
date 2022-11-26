
/**
 * payload value received from phone number name update webhook
 * @interface
 * @export
 */
export interface PhoneNumberNameUpdate {
    /**
     * display phone number
     * @type {string}
     */
    display_phone_number: string

    /**
     * decision
     * @type {string}
     */
    decision: string

    /**
     * requested verified name
     * @type {string}
     */
    requested_verified_name: string

    /**
     * rejection reason
     * @type {string}
     */
    rejection_reason: string
}
