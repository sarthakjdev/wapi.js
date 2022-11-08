import { Product } from './IProduct'
import { Row } from './IRow'

/**
 * Section interface
 * @interface
 * @export
 */
export interface Section {

    /**
     *  products to send, a minimum of 1 and a maximum of 30 products
     */
    product_items: Product[]

    /**
     * a list of rows in the section
     * @memberof Section
     */
    rows: Row[]

    /**
     *  title of the section
     * @memberof Section
     */
    title: string
}
