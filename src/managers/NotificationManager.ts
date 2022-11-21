import express from 'express'
import { WhatsappError } from '../error/WhatsappError'
import logger from '../utils/logger'
// eslint-disable-next-line import/no-cycle
import { WhatsappClient } from '../whatsapp'

export class NotificationManager {
    /**
     * api path to use for notification
     * @type {string}
     * @memberof apiPath
     */
    private phoneNumberInUse: string

    /**
     * Notification Manager
     * @constructor
     */
    constructor(client: WhatsappClient) {
        this.phoneNumberInUse = client.getPhoneNumberInUse
        this.initaite()
    }

    /**
     * initite the webhook listener
     * @memberof NotificationManager
     */
    private async initaite() {
        const webhookListener = express()
        webhookListener.use(express.urlencoded({ extended: true }))
        webhookListener.use(express.json)
        webhookListener.listen(3000, () => {
            logger.info('Listerner ready')
        })
        webhookListener.get('/', () => {
        })
    }

    /**
     * set the route of the webhook listener
     * @memberof NotificationManager
     */
    async setRoute() {
        logger.info('setting the route.......')
    }

    /**
     * set the request handler to execute on listening to the webhook request
     * @memberof NotificationManager
     */
    async setRequestHandler() {
        logger.info('setting the request handler........')
    }
}

