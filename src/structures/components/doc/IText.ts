
/**
 * interface to define text object in whatsapp cloud api
 * @export
 * @interface
 */
export interface Text {

    /**
     * text of the text message to send as message
     * @type {string}
     * @memberof Text
     */
    body: string

    /**
     * preview of the url contained in the text
     * @type {boolean}
     * @memberof Text
     */
    preview_url?: boolean
}
