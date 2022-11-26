
/**
 * identity paylaod
 * @interface
 * @export
 */
export interface IdentityPayload {

    /**
     * State of acknowledgment for the messages
     * @type {string}
     */
    acknowledged,

    /**
     * timestamp
     * @type {string}
     */
    created_timestamp: string

    /**
     * hash
     * @type {string}
     */
    hash: string,
}
