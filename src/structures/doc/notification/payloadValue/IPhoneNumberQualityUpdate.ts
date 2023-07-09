/**
 * payload value recieved from phone number quality update webhook
 * @interface
 * @export
 */
export interface PhoneNumberQualityUpdate {
	/**
	 * display phoane number
	 * @type {string}
	 */
	display_phone_number: string

	/**
	 * event
	 * @type {string}
	 */
	event: string

	/**
	 * current limit
	 * @type {LIMIT}
	 */
	current_limit: PhoneNumberQualityUpdateLimitEnum

	/**
	 * old limit
	 * @type {LIMIT}
	 */
	old_limit: PhoneNumberQualityUpdateLimitEnum
}

enum PhoneNumberQualityUpdateLimitEnum {
	TIER_50 = 'TIER_50',
	TIER_250 = 'TIER_250 ',
	TIER_1K = 'TIER_1K',
	TIER_10K = 'TIER_10K',
	TIER_100K = 'TIER_100K',
	TIER_UNLIMITED = 'TIER_UNLIMITED'
}
