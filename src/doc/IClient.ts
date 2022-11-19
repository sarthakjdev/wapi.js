export interface ClientOptions {

    /**
     * access token required to authorize the whatsapp cloud api access
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    token: string

    /**
     * mobile number to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    phone_number: string

    /**
     * bussiness account id to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    business_account_id: string

    /**
     * phone number id to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    phone_number_id: string

    /**
     * version of APi to use
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    version: string
}
