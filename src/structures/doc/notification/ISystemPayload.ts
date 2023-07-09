/**
 * system payload recieved, if the notification message if of type system
 * @interface
 * @export
 */
export interface SystemPayload {
	/**
	 * body of the payload
	 * @type {string}
	 */
	body: string

	/**
	 * identity
	 *
	 */
	identity: string

	/**
	 * New WhatsApp ID for the customer when their phone number is updated.
	 * Available on webhook versions V11 and below
	 * @type {string}
	 */
	new_wa_id: string

	/**
	 *  New WhatsApp ID for the customer when their phone number is updated.
	 * Available on webhook versions V12 and above
	 * @type {string}
	 */
	wa_id: string

	/**
	 * type of system update
	 * @type {SystemUpdateTypeEnum}
	 */
	type: SystemUpdateTypeEnum

	/**
	 * WhatsApp ID for the customer prior to the update
	 * @type {string}
	 */
	customer: string
}

/**
 * type of the system update
 * @enum
 * @export
 */
export enum SystemUpdateTypeEnum {
	customer_changed_number = 'customer_changed_number',
	customer_identity_chnaged = 'customer_identity_chnaged'
}
