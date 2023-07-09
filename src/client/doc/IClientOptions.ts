export interface ClientOptions {
	/**
	 * mobile number to be used by whatsapp cloud api
	 * @type {string}
	 * @memberof ClientOptions
	 */
	phone_number: string

	/**
	 * bussiness account id to be used by whatsapp cloud api
	 * @type {string}
	 * @memberof ClientOptions
	 */
	business_account_id: string

	/**
	 * phone number id to be used by whatsapp cloud api
	 * @type {string}
	 * @memberof ClientOptions
	 */
	phone_number_id: string

	/**
	 * version of APi to use
	 * @type {string}
	 * @memberof ClientOptions
	 */
	version: string

	/**
	 * port number for the webhook listner server
	 * @type {number}
	 * @memberof ClientOptions
	 */
	port: number
}
