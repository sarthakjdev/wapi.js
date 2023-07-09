/**
 * Currency interface
 * @interface
 * @export
 */
export interface Currency {
	/**
	 * Default text if localization fails
	 * @memberof Currency
	 */
	fallback_value: string

	/**
	 * currency code as defined in ISO 4217
	 * @memberof Currency
	 */
	code: string

	/**
	 *  amount mutiplied by 1000
	 * @memberof Currency
	 */
	amount_1000: string
}
