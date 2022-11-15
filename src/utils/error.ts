
/**
 * custom error whatsapp.js utility
 * @class
 * @extends {Error}
 * @export
 *
 */
export class WhatsappError extends Error {
    /**
     * constructor od Whatsapp Error class
     * @param message
     */
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}
