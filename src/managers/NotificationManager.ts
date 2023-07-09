/* eslint-disable import/no-cycle */
import express, { type Response, type Request } from 'express'
import {
	type Change,
	NotificationMessageTypeEnum,
	type MessagePaylaodValue,
	type PayloadMessage,
	type AccountAlert
} from '../structures/index'
import { NotificationTypeEnum } from '../structures/doc/notification/INotificationType'
import { EventEnum } from '../events/index'
import { BaseManager } from './BaseManager'

export class NotificationManager extends BaseManager {
	/**
	 * check type of notification received and emits the events accordingly
	 * @param {Change} change
	 */
	protected checkNotificationType(change: Change) {
		switch (change.field) {
			case NotificationTypeEnum.AccountAlerts:
				this.client.emit(EventEnum.AccountAlerts, change.value as AccountAlert)
				break
			case NotificationTypeEnum.AccountReviewUpdate:
				this.client.emit(EventEnum.AccountReviewUpdate, change.value)
				break
			case NotificationTypeEnum.AccountUpdate:
				this.client.emit(EventEnum.AccountUpdate, change.value)
				break
			case NotificationTypeEnum.Messages:
				// eslint-disable-next-line no-case-declarations
				const { messages } = change.value as MessagePaylaodValue
				this.checkMessageType(messages)
				break
			case NotificationTypeEnum.PhoneNumberNameUpdate:
				this.client.emit(EventEnum.PhoneNumberNameUpdate, change.value)
				break
			case NotificationTypeEnum.PhoneNumberQualityUpdate:
				this.client.emit(EventEnum.AccountReviewUpdate, change.value)
				break
			case NotificationTypeEnum.Security:
				this.client.emit(EventEnum.Security, change.value)
				break
			case NotificationTypeEnum.TemplatePerformanceMetrics:
				this.client.emit(EventEnum.TemplatePerformanceMetrics, change.value)
				break
			case NotificationTypeEnum.BusinessCapabilityUpdate:
				this.client.emit(EventEnum.BusinessCapabilityUpdate, change.value)
				break
			case NotificationTypeEnum.MessageTemplateStatusUpdate:
				this.client.emit(EventEnum.MessageTemplateStatusUpdate, change.value)
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
		message?.map(m => {
			switch (m.type) {
				case NotificationMessageTypeEnum.Audio:
					return this.client.emit(EventEnum.AudioMessage, m.audio)
				case NotificationMessageTypeEnum.Video:
					return this.client.emit(EventEnum.VideoMessage, m.video)
				case NotificationMessageTypeEnum.Document:
					return this.client.emit(EventEnum.DocumentMessage, m.document)
				case NotificationMessageTypeEnum.Button:
					return this.client.emit(EventEnum.InteractiveMessage, m.button)
				case NotificationMessageTypeEnum.Image:
					return this.client.emit(EventEnum.ImageMessage, m.image)
				case NotificationMessageTypeEnum.Interactive:
					return this.client.emit(EventEnum.InteractiveMessage, m.interactive)
				case NotificationMessageTypeEnum.Order:
					return this.client.emit(EventEnum.Order, m.order)
				case NotificationMessageTypeEnum.Sticker:
					return this.client.emit(EventEnum.StickerMessage, m.sticker)
				case NotificationMessageTypeEnum.Text:
					return this.client.emit(EventEnum.TextMessage, m.text)
				case NotificationMessageTypeEnum.System:
					return this.client.emit(EventEnum.SystemMessage, m.system)
				case NotificationMessageTypeEnum.Unknown:
					return this.client.emit(EventEnum.UnknownMessage)
				default:
					return undefined
			}
		})
	}

	private async subscribeToWebhook() {
		const response = await this.client.getRequestClient.post(
			`${this.client.getBusinessAccountId}/subscribed_apps`
		)

		return response.data
	}

	private async getSubscribedAppDetails() {
		const response = await this.client.getRequestClient.get(
			`${this.client.getBusinessAccountId}/subscribed_apps`
		)

		return response.data
	}

	/**
	 * initiate the webhook listener
	 * @memberof NotificationManager
	 */
	initiate() {
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
			entries.map(async e => {
				const { changes } = e
				await changes.map(c => this.checkNotificationType(c))
			})

			return res.status(200).send('Notification recieved !!')
		})
		webhookListener.listen(port, () => {
			this.client.emit(EventEnum.Ready)
		})

		// await this.subscribeToWebhook()
	}
}
