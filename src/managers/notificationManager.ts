import { AxiosInstance } from 'axios'
// eslint-disable-next-line import/no-cycle
import { Client } from '../whatsapp'

export class NotificationManager {
    /**
     * axios instance to make http request to the whatsapp cloud API
     * @type {AxiosInstance}
     * @memberof MessageManager
     */
    private axiosClient: AxiosInstance

    /**
     * api path to use for notification
     * @type {string}
     * @memberof apiPath
     */
    private apiPath: string

    /**
     * Notification Manager
     * @constructor
     */
    constructor(client: Client) {
        this.axiosClient = client.getRequestClient
    }
}
