import { Media } from '../IMedia'
import { Currency } from './ICurrency'
import { DateTime } from './IDateTime'

/**
 * interface to represent to paramter object
 * @interface
 * @export
 */
export interface Parameter {

    /**
     * type of paramter
     * @memberof Parameter
     */
    type: PARAMETER_TYPE

    /**
     * message text
     * @memberof Parameter
     */
    text: string

    /**
     *  currency object, if type="CURRENCY"
     * @memberof Parameter
     */
    currency: Currency

    /**
     *  date-time object, if type="CURRENCY"
     * @memberof Parameter
     */
    date_time: DateTime

    /**
     * media object of type image
     * @memberof Parameter
     */
    image: Media

    /**
     * media object of type document
     * @memberof Parameter
     */
    document: Media

    /**
     * media object of type mere sath t
     * @memberof Parameter
     */
    video: Media
}

enum PARAMETER_TYPE {
    'currency',
    'document',
    'image',
    'text',
    'video',
}
