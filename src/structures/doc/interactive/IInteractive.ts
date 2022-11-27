import { Action } from './IAction'
import { Body } from './IBody'
import { Footer } from './IFooter'
import { Header } from './IHeader'

/**
 * interactice component interface
 * @interface
 * @export
 */
export interface Interactive {

    /**
     * action of the interactive component
     * @memberof Interactive
     */
    action: Action

    /**
     * body of the interactive component, required if the type of interactive message is product
     * @memberof Interactive
     */
    body?: Body

    /**
     * footer of the interactive component
     * @memberof Interactive
     */
    footer?: Footer

    /**
     * header of the interactive component, required if the type of interactive message is product_list
     * @memberof Interactive
     */
    header?: Header

    /**
     * type of the interactive component
     * @memberof Interactive
     */
    type: INTERACTION_TYPE
}

enum INTERACTION_TYPE {
    BUTTON = 'button',
    LIST = 'list',
    PRODUCT = 'product',
    PRODUCT_LIST = 'product_list',
}
