
/**
 * interaction recieved from user
 * @interface
 * @export
 */
export interface UserInteraction {
    /**
     * type of interaction recieved
     * @type {ButtonInteraction | ListInteraction}
     */
    type: ButtonInteraction | ListInteraction
}

/**
 * button interaction
 * @interface
 * @export
 */
export interface ButtonInteraction {
    /**
     * id of the interacted button
     * @type {string}
     */
    id: string

    /**
     * title of the button
     * @type {string}
     */
    title: string
}

/**
 * list interacction
 * @interface
 * @export
 */
export interface ListInteraction {

    /**
     * id of the list
     * @type  {string}
     */
    id: string

    /**
     * title of the list
     * @type {string}
     */
    title: string

    /**
     * description of the list
     * @type {string}
     */
    description: string
}
