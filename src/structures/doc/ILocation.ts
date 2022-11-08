
/**
 * location interface used for representing a location
 * @interface
 * @export
 */
export interface Location {
    /**
     * latitude od the location
     * @type {string}
     */
    laittude: string

    /**
     * longitude of the location
     * @type {string}
     */
    longitute: string

    /**
     * name of the location
     * @type {string}
     */
    name?: string

    /**
     * addresss of the location
     * @type {string}
     */
    address?: string

}
