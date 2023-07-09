/**
 * paylaod receved from accoutn alerts webhook
 * @interface
 * @export
 */
export interface AccountAlert {
	entity_type: string
	entity_id: number
	alert_severity: string
	alert_status: string
	alert_type: string
	alert_description: string
}
