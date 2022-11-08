import { Parameter } from './IParameter'

/**
 * TemplateComponent interface
 * @interface
 * @export
 */
export interface TemplateComponent {

    /**
     * type of the TemplateComponent
     * @memberof TemplateComponent
     */
    type: string

    /**
     * sub type of the TemplateComponent
     * @memberof TemplateComponent
     */
    sub_type: string

    /**
     * parameters of the TemplateComponent
     * @memberof TemplateComponent
     */
    parameters: Parameter

    /**
     * index of the TemplateComponent
     * @memberof TemplateComponent
     */
    index: string
}
