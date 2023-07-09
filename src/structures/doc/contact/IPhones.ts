/**
 * Phone interface
 * @interface
 * @export
 */
export interface Phone {
	/**
	 * phone number
	 * @memberof Phone
	 */
	phone?: string

	/**
	 * type of the phone
	 * @memberof Phone
	 */
	type?: PhoneTypeEnum

	/**
	 * phone number
	 * @memberof Phone
	 */
	wa_id?: string
}

enum PhoneTypeEnum {
	'CELL',
	'MAIN',
	'IPHONE',
	'HOME',
	'WORK'
}
