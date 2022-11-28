
/**
 * sticker payload
 * @interface
 * @export
 */
export interface StickerPayload {
    /**
     * mime type of the media recieved
     * @type {string}
     */
    mime_type: string

    /**
     * hash
     * @type {string}
     */
    sha256: string

    /**
     * id of the file
     * @type {string}
     */
    id: string

    /**
     * if the sticker is animated
     * @type {boolean}
     */
    animated: boolean
}
