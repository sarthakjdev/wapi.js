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
     * @type {TYPEOFHEADER}
     * @memberof Header
     */
    type: TYPEOFHEADER

    /**
     * document to send in the header of interactive message
     * @memberof Header
     */
    video: Media
}

enum TYPEOFHEADER {
    'text',
    'video',
    'image',
    'document',
}
