
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
    type?: PHONE_TYPE

    /**
     * phone number
     * @memberof Phone
     */
    wa_id?: string
}

enum PHONE_TYPE {
    'CELL',
    'MAIN',
    'IPHONE',
    'HOME',
    'WORK',
}
