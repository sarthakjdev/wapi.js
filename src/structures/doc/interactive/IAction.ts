import { Button } from './IButton'
import { Section } from './ISection'

/**
 * Action interface
 * @interface
 * @export
 */
export interface Action {

    /**
     * button content, required for list messages
     * @type {string}
     * @memberof Action
     */
    button?: string

    /**
     * button for reply buttons, required for reply buttons
     * @memberof Action
     */
    buttons?: Button[]

    /**
     * unique identifier of your facebook catalog linked to your, required for single and multi product messages
     * whatsapp business account
     * @type {string}
     * @memberof Action
     */
    catalog_id?: string

    /**
     * unique  identifier of the product in a catalog, required for single product message and multi-product messages
     * @type {string}
     * @memberof Action
     */
    product_retailler_id?: string

    /**
     * sections of the message, required for list messages and mutli product messages
     * @memberof Action
     */
    sections?: Section[]
}
