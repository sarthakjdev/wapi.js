/**
 * phone number registered to use for business API
 * @interface
 * @export
 */
export interface PhoneNumber {
	/**
	 * a string identifier to your phone number
	 * @type {string}
	 * @memberof PhoneNumber
	 */
	name?: string

	/**
	 * phone number id or phone number
	 * @type {string}
	 * @memberof PhoneNumber
	 */
	phone_number_id: string

	/**
	 * status of the registered phone number
	 * @type {PhoneNumberStatusEnum}
	 * @memberof PhoneNumber
	 */
	status?: PhoneNumberStatusEnum

	/**
	 * if the phone number is used as deafault
	 * @type {boolean}
	 * @memberof PhoneNumber
	 */
	default?: boolean
}

export enum PhoneNumberStatusEnum {
	'verified',
	'registered'
}
