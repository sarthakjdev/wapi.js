import { TemplateComponent } from './IComponent'
import { Language } from './ILanguage'

/**
 * interface to represent the template object
 * @interface
 * @export
 */
export interface Template {

    /**
     * name of the template
     * @memberof Template
     */
    name: string

    /**
     * language to render the template in
     * @memberof Template
     */
    languege: Language

    /**
     * array of components objects containing the parameters of the message
     * @memberof Template
     */
    components?: TemplateComponent[]

}
