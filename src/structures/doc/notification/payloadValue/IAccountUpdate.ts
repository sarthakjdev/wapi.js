/**
 * payload recieved from account update webhook
 * @interface
 * @export
 */
export interface AccountUpdate {
	/**
	 * phone number
	 * @type {string}
	 */
	phone_number: string

	/**
	 * account update event
	 * @type {string}
	 */
	event: string

	/**
	 * ban info
	 */
	ban_info: {
		/**
		 * waba ban state
		 * @type {string}
		 */
		waba_ban_state: string

		/**
		 * waba ban date
		 * @type {string}
		 */
		waba_ban_date: string
	}

	/**
	 * information about a violation on the account
	 */
	violation_info: {
		/**
		 * type of violation
		 * @type {string}
		 */
		violation_type: string
	}

	/**
	 * lock info
	 */
	lock_info: {
		/**
		 * the expiration of the lock
		 * @type {Date}
		 */
		expirationL: string
	}

	/**
	 * information about the restriction on the account
	 */
	restriction_info: {
		/**
		 * restriction type
		 * @type {string}
		 */
		restriction_type: string

		/**
		 * expiration
		 * @type {string}
		 */
		expiration: string
	}
}
