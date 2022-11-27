
/**
 * location interface used for representing a location
 * @interface
 * @export
 */
export interface Location {
    /**
     * latitude od the location
     * @type {string}
     * @memberof Location
     */
    laittude: string

    /**
     * longitude of the location
     * @type {string}
     * @memberof Location
     */
    longitute: string

    /**
     * name of the location
     * @type {string}
     * @memberof Location
     */
    name?: string

    /**
     * addresss of the location
     * @type {string}
     * @memberof Location
     */
    address?: string

}
