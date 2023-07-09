/**
 * document payload
 * @interface
 * @export
 */
export interface DocumentPayload {
	/**
	 * caption of the documetn message
	 * @type {string}
	 */
	caption?: string

	/**
	 * filename of the document
	 * @type {string}
	 */
	filename: string

	/**
	 * hash of the file
	 * @type {string}
	 */
	ha256: string

	/**
	 * mime type of the docuemnt
	 * @type {string}
	 */
	mime_type: string

	/**
	 * id of the document
	 * @type {string}
	 */
	id: string
}
