
/**
 * image payload
 * @interface
 * @export
 */
export interface ImagePayload {
    /**
     * caption of the message
     * @type {string}
     */
    caption?: string

    /**
     * hash of the image
     * @type {string}
     */
    sha256: string

    /**
     * mime type of the file
     * @type {string}
     */
    mime_type: string

    /**
     * id of the message file
     * @type {string}
     */
    id: string
}
