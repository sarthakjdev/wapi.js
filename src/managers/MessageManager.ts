/* eslint-disable consistent-return */
import { type WhatsApiResponse } from '../error/index'
import {
	type AudioMessageComponent,
	type DocumentMessageComponent,
	type InteractiveMessageComponent,
	type LocationMessageComponent,
	MessageComponent,
	type ReactionMessageComponent,
	type TemplateMessageComponent,
	type TextMessageComponent,
	type VideoMessageComponent
} from '../structures/index'
import { WhatsappError } from '../error/WhatsappError'
// eslint-disable-next-line import/no-cycle
import { BaseManager } from './BaseManager'

export class MessageManager extends BaseManager {
	/**
	 * sends text message to a recipent
	 * @param {TextMessageComponent} textComponent
	 * @param {string} recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async sendText(
		textComponent: TextMessageComponent,
		recipent?: string
	): Promise<WhatsApiResponse | WhatsappError> {
		if (recipent) {
			textComponent.setRecipent(recipent)
		} else if (
			textComponent.getRecipent === '' ||
			textComponent.getRecipent === null ||
			textComponent.getRecipent === undefined
		) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		textComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			`${this.client.getPhoneNumberInUse}/messages`,
			textComponent
		)

		return response.data
	}

	/**
	 * sensetPhoneNumberInUseds audio message to a recipent
	 * @param {AudioMessageComponent} audioComponent
	 * @param  {string} recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async audio(audioComponent: AudioMessageComponent, recipent: string) {
		if (recipent) {
			audioComponent.setRecipent(recipent)
		} else if (audioComponent.getRecipent === '' || audioComponent.getRecipent === null) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		audioComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			`${this.client.getPhoneNumberInUse}`,
			audioComponent
		)

		return response.data
	}

	/**
	 * sends the video message to a recipent
	 * @param {VideoMessageComponent} videoComponent
	 * @param recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async video(videoComponent: VideoMessageComponent, recipent: string) {
		if (recipent) {
			videoComponent.setRecipent(recipent)
		} else if (videoComponent.getRecipent === '' || videoComponent.getRecipent === null) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		videoComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			this.client.getPhoneNumberInUse,
			videoComponent
		)

		return response.data
	}

	/**
	 *  sends the document message to a recipent
	 * @param  {DocumentMessageComponent} documentComponent
	 * @param recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async document(documentComponent: DocumentMessageComponent, recipent: string) {
		if (recipent) {
			documentComponent.setRecipent(recipent)
		} else if (documentComponent.getRecipent === '' || documentComponent.getRecipent === null) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		documentComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			this.client.getPhoneNumberInUse,
			documentComponent
		)

		return response.data
	}

	/**
	 * sends the template message to a recipent
	 * @param {TemplateMessageComponent} templateComponent
	 * @param recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async template(templateComponent: TemplateMessageComponent, recipent: string) {
		if (recipent) {
			templateComponent.setRecipent(recipent)
		} else if (templateComponent.getRecipent === '' || templateComponent.getRecipent === null) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		templateComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			this.client.getPhoneNumberInUse,
			templateComponent
		)

		return response.data
	}

	/**
	 * sends the interactive message to a recipent
	 * @param {InteractiveMessageComponent} interactiveComponent
	 * @param recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async interaction(interactiveComponent: InteractiveMessageComponent, recipent: string) {
		if (recipent) {
			interactiveComponent.setRecipent(recipent)
		} else if (
			interactiveComponent.getRecipent === '' ||
			interactiveComponent.getRecipent === null
		) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		interactiveComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			this.client.getPhoneNumberInUse,
			interactiveComponent
		)

		return response.data
	}

	/**
	 * sends the location message to a recipent
	 * @param {LocationMessageComponent} locationComponent
	 * @param recipent
	 * @returns
	 * @memberof MessageManager
	 */
	async location(locationComponent: LocationMessageComponent, recipent?: string) {
		if (recipent) {
			locationComponent.setRecipent(recipent)
		} else if (locationComponent.getRecipent === '' || locationComponent.getRecipent === null) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		const response = await this.client.getRequestClient.post(
			this.client.getPhoneNumberInUse,
			locationComponent
		)

		return response.data
	}

	/**
	 *  sends the reaction message to a recipent
	 * @param {ReactionMessageComponent} reactionComponent
	 * @param recipent
	 * @returns
	 */
	async reaction(reactionComponent: ReactionMessageComponent, recipent: string) {
		if (recipent) {
			reactionComponent.setRecipent(recipent)
		} else if (reactionComponent.getRecipent === '' || reactionComponent.getRecipent === null) {
			throw new WhatsappError('Component must include a recipent id before sending')
		}
		reactionComponent.setRecipent(recipent)
		const response = await this.client.getRequestClient.post(
			this.client.getPhoneNumberInUse,
			reactionComponent
		)

		return response.data
	}

	/**
	 * mark a message as read
	 * @param {string} messageId
	 * @memberof MessageManager
	 */
	async markRead(messageId: string) {
		const message = new MessageComponent({ status: 'read' })
		message.setMessageContext(messageId)
		const response = await this.client.getRequestClient.post(this.client.getPhoneNumberInUse)

		return response
	}
}
