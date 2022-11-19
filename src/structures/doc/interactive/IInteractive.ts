import { Action } from './IAction'
import { Body } from './IBody'
import { Footer } from './IFooter'
import { Header } from './IHeader'

/**
 * interactice component interface
 * @interface
 * @export
 */
export interface Interaction {

    /**
     * action of the interactive component
     * @memberof Interactive
     */
    action: Action

    /**
     * body of the interactive component
     * @memberof Interactive
     */
    body: Body

    /**
     * footer of the interactive component
     * @memberof Interactive
     */
    footer: Footer

    /**
     * header of the interactive component
     * @memberof Interactive
     */
    header: Header

    /**
     * type of the interactive component
     * @memberof Interactive
     */
    type: INTERACTION_TYPE
}

enum INTERACTION_TYPE {
    'button',
    'list',
    'product',
    'product_list',
}
