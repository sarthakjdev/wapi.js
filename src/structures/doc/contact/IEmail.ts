/**
 * email interface
 * @interface
 * @export
 */
export interface Email {
	/**
	 * email address of the email object
	 * @memerof Email
	 */
	email?: string

	/**
	 * type of the email address
	 * @memberof Email
	 */
	type?: EmailTypeEnum
}

enum EmailTypeEnum {
	'HOME',
	'WORK'
}
