/**
 * video payload
 * @interface
 * @export
 */
export interface VideoPayload {
	/**
	 * caption of the video message
	 * @type {string}
	 */
	caption?: string

	/**
	 * filename of the video
	 * @type {string}
	 */
	filename: string

	/**
	 * hash of the file
	 * @type {string}
	 */
	sha256: string

	/**
	 * id of the file
	 * @type {string}
	 */
	id: string

	/**
	 * mime type of the media
	 * @type {string}
	 */
	mime_type: string
}
