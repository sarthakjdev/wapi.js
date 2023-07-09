/**
 * Language interface
 * @interface
 * @export
 */
export interface Language {
	/**
	 * language policy to follow
	 * @memberof Language
	 */
	policy?: string

	/**
	 * code of the language or locale to use. Accepts both language and
	 * language_locale format (e.g., en annd en_US)
	 * @memberof Language
	 */
	code?: string
}
