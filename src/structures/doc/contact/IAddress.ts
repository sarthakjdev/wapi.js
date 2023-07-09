/**
 * Address interface
 * @interface
 * @export
 */
export interface Address {
	/**
	 * street number and name
	 * @memberof Address
	 */
	street?: string

	/**
	 * city name
	 * @memberof Address
	 */
	city?: string

	/**
	 * state abbreviation
	 * @memberof Address
	 */
	state?: string

	/**
	 * zip code
	 * @memberof Address
	 */
	zip?: string

	/**
	 * full ccountry name
	 * @memberof Address
	 */
	country?: string

	/**
	 * two-letter country abbreviation
	 * @memberof Address
	 */
	country_code?: string

	/**
	 * type of address
	 * @type {ContactAddressTypeEnum}
	 * @memberof Address
	 */
	type?: ContactAddressTypeEnum
}

enum ContactAddressTypeEnum {
	'HOME',
	'WORK'
}
