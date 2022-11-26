
/**
 * payload value recieved from business capability update webhook
 * @interface
 * @export
 */
export interface BusinessCapabilityUpdate {
    /**
     * The number of unique people each phone number can contact per day
     * @type {number}
     * @memberof BusinessCapabilityUpdate
     */
    max_daily_conversation_per_phone: number

    /**
     * The maximum number of phone numbers each WhatsApp Business Account can have.
     * Either this field or max_phone_numbers_per_business will be present
     * @type {number}
     * @memberof BusinessCapabilityUpdate
     */
    max_phone_numbers_per_waba : number

    /**
     * The maximum number of phone numbers each business can have.
     * Either this field or max_phone_numbers_per_waba will be present
     * @type {number}
     * @memberof BusinessCapabilityUpdate
     */
    max_phone_numbers_per_business: number
}
