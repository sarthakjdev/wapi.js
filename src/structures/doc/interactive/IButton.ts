/**
 * button component interface
 * @interface
 * @export
 */
export interface Button {
	/**
	 * type of parameter of button
	 * @type {ButtonTypeEnum}
	 * @memberof Button
	 */
	type: ButtonTypeEnum

	/**
	 * title of the button
	 * @type {string}
	 * @memberof Button
	 */
	title: string

	/**
	 * unique identifier of the buttonn
	 * @type {string}
	 * @memberof Button
	 */
	id: string
}

enum ButtonTypeEnum {
	Payload = 'payload',
	Text = 'text'
}
