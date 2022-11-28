
/**
 * referral recieved, if the notification message recieved is of type referral
 * @interface
 * @export
 */
export interface Referral {
    /**
     * source url
     * @type {string}
     */
    source_url: string

    /**
     * source type
     * @type _
     */
    source_type: SOURCE_TYPE,

    /**
     * source id
     * @type {string}
     */
    source_id: string

    /**
     * headline of the referral
     * @type {string}
     */
    headline: string

    /**
     * body of the referral message
     * @type {string}
     */
    body: string

    /**
     * mime type of the referral
     * @type {string}
     */
    media_type: string

    /**
     * image url
     * @type {string}
     */
    image_url?: string

    /**
     * video url
     * @type {string}
     */
    video_url?: string,

    /**
     * thumbnail url
     * @type {string}
     */
    thumbnail_url?: string
}

/**
 * source of the referral
 * @enum
 */
enum SOURCE_TYPE {
    AD = 'ad',
    POST = 'post',
}
