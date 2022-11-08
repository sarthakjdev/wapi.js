
/**
 * Name interface
 * @interface
 * @export
 */
export interface Name {

    /**
     * full name, as it normally appears
     * @memberof Name
     */
    formatted_name: string

    /**
     * first name
     * @memberof Name
     */
    first_name?: string

    /**
     *  last name
     * @mmemberof Name
     */
    last_name?: string

    /**
     *  middle name
     * @memberof Name
     */
    middle_name?: string

    /**
     *  name suffix
     * @memberof Name
     */
    suffix?: string

    /**
     *  name prefix
     * @memberof prefix
     */
    prefix?: string
}
