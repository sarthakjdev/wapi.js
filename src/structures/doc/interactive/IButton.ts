
/**
 * buttom component interface
 * @interface
 * @export
 */
export interface Button {

    /**
     * type of paramter of button
     * @type {TYPE_OF_BUTTON}
     * @memberof Button
     */
    type: TYPE_OF_BUTTON

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

enum TYPE_OF_BUTTON {
    PAYLOAD = 'payload',
    TEXT = 'text',
}
