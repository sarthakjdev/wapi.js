import { type NotificationTypeEnum } from './INotificationType'
import { type AccountAlert } from './payloadValue/IAccountAlert'
import { type AccountUpdate } from './payloadValue/IAccountUpdate'
import { type AccoutnReviewUpdate } from './payloadValue/IAccountReviewUpdate'
import { type PhoneNumberNameUpdate } from './payloadValue/IPhoneNumberNameUpdate'
import { type PhoneNumberQualityUpdate } from './payloadValue/IPhoneNumberQualityUpdate'
import { type Security } from './payloadValue/ISecurity'
import { type BusinessCapabilityUpdate } from './payloadValue/IBusinessCapabilityUpdate'
import { type MessageTemplateStatusUpdate } from './payloadValue/IMessageTemplateStatusUpdate'
import { type TemplatePerformaceMetrics } from './payloadValue/ITemplatePerformanceMetrics'
import { type MessagePaylaodValue } from './payloadValue/IMessagePayloadValue'

/**
 * notification payload
 * @interface
 * @export
 */
export interface BasePayload {
	/**
	 *
	 */
	object: string

	/**
	 * entries received in notification
	 * @type {Entry[]}
	 * @memberof BasePayload
	 */
	entry: Entry[]
}

/**
 * entry involved in recieved notification
 * @interface
 * @export
 */
export interface Entry {
	/**
	 * unique identifier of the entry
	 * @type {string}
	 * @memberof Entry
	 */
	id: string

	/**
	 * chnages which trigerred the event
	 * @type {Change[]}
	 * @memberof Entry
	 */
	chnages: Change[]
}

/**
 * change which made the notification occur
 * @interface
 * @export
 */
export interface Change {
	/**
	 * value object
	 */
	value:
		| AccountUpdate
		| AccountAlert
		| AccoutnReviewUpdate
		| PhoneNumberNameUpdate
		| PhoneNumberQualityUpdate
		| Security
		| BusinessCapabilityUpdate
		| MessageTemplateStatusUpdate
		| TemplatePerformaceMetrics
		| MessagePaylaodValue
	field: NotificationTypeEnum
}
