import { Button } from './IButton'
import { Section } from './ISection'

/**
 * Action interface
 * @interface
 * @export
 */
export interface Action {

    /**
     * button content
     * @type {string}
     * @memberof Action
     */
    button: string

    /**
     * button for reply buttons
     * @memberof Action
     */
    buttons: Button[]

    /**
     * unique identifier of your facebook catalog linked to your
     * whatsapp business account
     * @type {string}
     * @memberof Action
     */
    catalog_id: string

    /**
     * unique  identifier of the product in a catalog
     * @memberof Action
     */
    product_retailler_id

    /**
     * sections of the message
     * @memberof Action
     */
    sections: Section[]
}
