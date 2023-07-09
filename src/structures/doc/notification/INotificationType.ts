/**
 * type of notification received
 * @enum
 * @export
 */
export enum NotificationTypeEnum {
	AccountAlerts = 'account_alerts',
	AccountReviewUpdate = 'account_review_update',
	AccountUpdate = 'account_update',
	BusinessCapabilityUpdate = 'business_capability_update',
	MessageTemplateStatusUpdate = 'message_template_status_update',
	Messages = 'messages',
	PhoneNumberNameUpdate = 'phone_number_name_update',
	PhoneNumberQualityUpdate = 'phone_number_quality_update',
	Security = 'security',
	TemplatePerformanceMetrics = 'template_performance_metrics'
}
