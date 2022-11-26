import { NOTIFICATION_TYPE } from './INotificationType'
import { AccountAlert } from './payloadValue/IAccountAlert'
import { AccountUpdate } from './payloadValue/IAccountUpdate'
import { AccoutnReviewUpdate } from './payloadValue/IAccountReviewUpdate'
import { PhoneNumberNameUpdate } from './payloadValue/IPhoneNumberNameUpdate'
import { PhoneNumberQualityUpdate } from './payloadValue/IPhoneNumberQualityUpdate'
import { Security } from './payloadValue/ISecurity'
import { BusinessCapabilityUpdate } from './payloadValue/IBusinessCapabilityUpdate'
import { MessageTemplateStatusUpdate } from './payloadValue/IMessageTemplateStatusUpdate'
import { TemplatePerformaceMetrics } from './payloadValue/ITemplatePerformanceMetrics'
import { MessagePaylaodValue } from './payloadValue/IMessagePayloadValue'

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
    value: AccountUpdate | AccountAlert | AccoutnReviewUpdate | PhoneNumberNameUpdate | PhoneNumberQualityUpdate | Security | BusinessCapabilityUpdate | MessageTemplateStatusUpdate | TemplatePerformaceMetrics | MessagePaylaodValue
    field: NOTIFICATION_TYPE,

}
