
/**
 * Phone interface
 * @interface
 * @export
 */
export interface Phone {
    /**
     * phone number
     * @memberof Phone
     */
    phone?: string

    /**
     * type of the phone
     * @memberof Phone
     */
    type?: TYPEOFPHONE

    /**
     * phone number
     * @memberof Phone
     */
    wa_id?: string
}

enum TYPEOFPHONE {
    'CELL',
    'MAIN',
    'IPHONE',
    'HOME',
    'WORK',
}
