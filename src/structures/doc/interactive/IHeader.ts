import { Media } from '../IMedia'

/**
 * interactive component header interface
 * @interface
 */
export interface Header {

    /**
     * document to send in the header of interactive message
     * @memberof Header
     */
    document?: Media

    /**
     * image to send in the header of interactive message
     * @memberof Header
     */
    image?: Media

    /**
     * text to send in the header of interactive message
     * @memberof Header
     */
    text?: string

    /**
     * document to send in the header of interactive message
     * @type {HEADER_TYPE}
     * @memberof Header
     */
    type: HEADER_TYPE

    /**
     * document to send in the header of interactive message
     * @memberof Header
     */
    video: Media
}

enum HEADER_TYPE {
    'text',
    'video',
    'image',
    'document',
}
