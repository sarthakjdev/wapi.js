/* eslint-disable import/no-cycle */
import express, { Response, Request } from 'express'
import {
    Change, NOTIFICATION_MESSAGE_TYPE, AudioPayload, MessagePaylaodValue, PayloadMessage, VideoPayload, DocumentPayload, ButtonPayload, ImagePayload, UserInteraction, CustomerOrder, StickerPayload, AccountAlert, TextPayload, SystemPayload,
} from '../structures/index'
import { NOTIFICATION_TYPE } from '../structures/doc/notification/INotificationType'
import { EVENTS } from '../events/index'
import { BaseManager } from './BaseManager'

export class NotificationManager extends BaseManager {
    /**
     * check type of notification received and emits the events accordingly
     * @param {Change} change
     */
    protected checkNotificationType(change: Change) {
        switch (change.field) {
            case NOTIFICATION_TYPE.ACCOUNT_ALERTS:
                this.client.emit(EVENTS.ACCOUNT_ALERTS, change.value as AccountAlert)
                break
            case NOTIFICATION_TYPE.ACCOUNT_REVIEW_UPDATE:
                this.client.emit(EVENTS.ACCOUNT_REVIEW_UPDATE, change.value)
                break
            case NOTIFICATION_TYPE.ACCOUNT_UPDATE:
                this.client.emit(EVENTS.ACCOUNT_UPDATE, change.value)
                break
            case NOTIFICATION_TYPE.MESSAGES:
                // eslint-disable-next-line no-case-declarations
                const { messages } = change.value as MessagePaylaodValue
                this.checkMessageType(messages)
                break
            case NOTIFICATION_TYPE.PHONE_NUMBER_NAME_UPDATE:
                this.client.emit(EVENTS.PHONE_NUMBER_NAME_UPDATE, change.value)
                break
            case NOTIFICATION_TYPE.PHONE_NUMBER_QUALITY_UPDATE:
                this.client.emit(EVENTS.ACCOUNT_REVIEW_UPDATE, change.value)
                break
            case NOTIFICATION_TYPE.SECURITY:
                this.client.emit(EVENTS.SECURITY, change.value)
                break
            case NOTIFICATION_TYPE.TEMPLATE_PERFORMANCE_METRICS:
                this.client.emit(EVENTS.TEMPLATE_PERFORMANCE_METRICS, change.value)
                break
            case NOTIFICATION_TYPE.BUSIINESS_CAPABILITY_UPDATE:
                this.client.emit(EVENTS.BUSIINESS_CAPABILITY_UPDATE, change.value)
                break
            case NOTIFICATION_TYPE.MESSAGE_TEMPLATE_STATUS_UPDATE:
                this.client.emit(EVENTS.MESSAGE_TEMPLATE_STATUS_UPDATE, change.value)
                break
            default:
                break
        }
    }

    /**
     *  check the type of message notification received and emit the event accordingly
     * @param {PayloadMessage[]} message
     */
    protected checkMessageType(message: PayloadMessage[]) {
        message.map((m) => {
            switch (m.type) {
                case NOTIFICATION_MESSAGE_TYPE.AUDIO:
                    return this.client.emit(EVENTS.AUDIOMESSAGE, m.audio as AudioPayload)
                case NOTIFICATION_MESSAGE_TYPE.VIDEO:
                    return this.client.emit(EVENTS.VIDEO_MESSAGE, m.video as VideoPayload)
                case NOTIFICATION_MESSAGE_TYPE.DOCUMENT:
                    return this.client.emit(EVENTS.DOCUMENT_MESSAGE, m.document as DocumentPayload)
                case NOTIFICATION_MESSAGE_TYPE.BUTTON:
                    return this.client.emit(EVENTS.INTERACTION, m.button as ButtonPayload)
                case NOTIFICATION_MESSAGE_TYPE.IMAGE:
                    return this.client.emit(EVENTS.IMAGE_MESSAGE, m.image as ImagePayload)
                case NOTIFICATION_MESSAGE_TYPE.INTERACTIVE:
                    return this.client.emit(EVENTS.INTERACTION, m.interactive as UserInteraction)
                case NOTIFICATION_MESSAGE_TYPE.ORDER:
                    return this.client.emit(EVENTS.ORDER, m.order as CustomerOrder)
                case NOTIFICATION_MESSAGE_TYPE.STICKER:
                    return this.client.emit(EVENTS.STICKER_MESSAGE, m.sticker as StickerPayload)
                case NOTIFICATION_MESSAGE_TYPE.TEXT:
                    return this.client.emit(EVENTS.TEXT_MESSAGE, m.text as TextPayload)
                case NOTIFICATION_MESSAGE_TYPE.SYSTEM:
                    return this.client.emit(EVENTS.SYSTEM_MESSAGE, m.system as SystemPayload)
                case NOTIFICATION_MESSAGE_TYPE.UNKNOWN:
                    return this.client.emit(EVENTS.UNKNOWN_MESSAGE)
                default:
                    return undefined
            }
        })
    }

    private async subscribeToWebhook() {
        const response = await this.client.getRequestClient.post(`${this.client.getBusinessAccountId}/subscribed_apps`)

        return response.data
    }

    private async getSubscribedAppDetails() {
        const response = await this.client.getRequestClient.get(`${this.client.getBusinessAccountId}/subscribed_apps`)

        return response.data
    }

    /**
     * initiate the webhook listener
     * @memberof NotificationManager
     */
    async initiate() {
        const port = 3000
        const webhookListener = express()
        webhookListener.use(express.urlencoded({ extended: true }))
        webhookListener.use(express.json())
        webhookListener.get('/webhook', (req: Request, res: Response) => {
            const verifyToken = 'hello'
            // Parse params from the webhook verification request
            const mode = req.query['hub.mode']
            const token = req.query['hub.verify_token']
            const challenge = req.query['hub.challenge']
            if (mode && token) {
                // Check the mode and token sent are correct
                if (mode === 'subscribe' && token === verifyToken) {
                    res.status(200).send(challenge)
                } else {
                    res.sendStatus(403)
                }
            }
        })

        webhookListener.post('/webhook', (req: Request, res: Response) => {
            const entries = req.body.entry
            console.log(req.body.entry[0].changes[0])
            entries.map(async (e) => {
                const { changes } = e
                await changes.map((c) => this.checkNotificationType(c))
            })
            res.sendStatus(200)
        })
        webhookListener.listen(port, () => {
            this.client.emit(EVENTS.READY)
        })

        // await this.subscribeToWebhook()
    }
}

