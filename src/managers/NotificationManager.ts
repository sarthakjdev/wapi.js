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
    }

    /**
     * initite the webhook listener
     * @memberof NotificationManager
     */
    async initaite() {
        try {
            const webhookListener = express()
            webhookListener.use(express.urlencoded({ extended: true }))
            webhookListener.use(express.json)
            webhookListener.get('/', () => {
                logger.info('Whatsapp.js client webhook ready to listen the events')
            })
        } catch (error) {
            throw new WhatsappError(error)
        }
    }

    /**
     * set the route of the webhook listener
     * @memberof NotificationManager
     */
    async setRoute() {
        try {
            logger.info('setting the route.......')
        } catch (error) {
            throw new WhatsappError(error)
        }
    }

    /**
     * set the request handler to execute on listening to the webhook request
     * @memberof NotificationManager
     */
    async setRequestHandler() {
        try {
            logger.info('setting the request handler........')
        } catch (error) {
            throw new WhatsappError(error)
        }
    }
}

