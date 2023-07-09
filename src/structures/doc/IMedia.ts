/**
 * Media interface for audio, video, document, sticker and image media
 * @interface
 * @export
 */
export interface Media {
	/**
	 * link od the media, http or https urls, required when not using a upload media id
	 * @type {string}
	 * @memberof Media
	 */
	link?: string

	/**
	 * media object id, required when using a upload media
	 * @type {string}
	 * @memberof Media
	 */
	id?: string

	/**
	 * describes the specifies image, document and video media
	 * @type {string}
	 * @memberof Media
	 */
	caption?: string

	/**
	 * decribes the file name of the specified document, to be used only with document media
	 * @type {string}
	 * @memberof Media
	 */
	filename?: string
}
