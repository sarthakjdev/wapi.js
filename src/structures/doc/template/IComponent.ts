import { type Parameter } from './IParameter'

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
	 * sub type of the TemplateComponent, required when type of template component is button
	 * @memberof TemplateComponent
	 */
	sub_type?: string

	/**
	 * parameters of the TemplateComponent, required when type of template component is button
	 * @memberof TemplateComponent
	 */
	parameters?: Parameter

	/**
	 * index of the TemplateComponent, required when type of template component is button
	 * @memberof TemplateComponent
	 */
	index?: string
}
