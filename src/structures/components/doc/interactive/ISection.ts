import { Product } from './IProduct'
import { Row } from './IRow'

/**
 * Section interface
 * @interface
 * @export
 */
export interface Section {

    /**
     *  array of products to send, a minimum of 1 and a maximum of 30 products, required for multi-product message
     * @type {Product[]}
     * @memberof Section
     */
    product_items?: Product[]

    /**
     * a list of rows in the section, requied for list message
     * @type {Row[]}
     * @memberof Section
     */
    rows: Row[]

    /**
     *  title of the section, required if the message has more than one section
     * @type {string}
     * @memberof Section
     */
    title: string
}
