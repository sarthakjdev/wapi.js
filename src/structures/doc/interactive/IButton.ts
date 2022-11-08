
/**
 * buttom component interface
 * @interface
 * @export
 */
export interface Button {

    /**
     * type of paramter of button
     * @type {TYPEOFBUTTON}
     * @memberof Button
     */
    type: TYPEOFBUTTON

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

enum TYPEOFBUTTON {
    'payload',
    'text',
}
