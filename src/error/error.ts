import { AxiosError } from 'axios'

/**
 * custom error whatsapp.js utility
 * @class
 * @extends {Error}
 * @export
 */
export class WhatsappError extends Error {
    /**
     * constructor od Whatsapp Error class
     * @param message
     */
    constructor(message: string, statusCode?: string | number, description?: string, axiosError?: AxiosError) {
        super(message)
        this.name = this.constructor.name
        if (description) this.cause = description
        Error.captureStackTrace(this, this.constructor)
    }
}
