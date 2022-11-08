
/**
 * Media interface for audio, video, document, sticker and image media
 * @interface
 * @export
 */
export interface Media {

    /**
     * link od the media, http or https urls
     * @memberof Media
     */
    link: string

    /**
     * media object id
     * @memberof Media
     */
    id: string

    /**
     * describes the specifies image, document and video media
     * @memberof Media
     */
    caption: string

    /**
     * decribes the file name of the specified document, to be used only with document media
     * @memberof Media
     */
    filename?: string
}
