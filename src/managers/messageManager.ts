import { AxiosInstance, AxiosResponse } from 'axios'
import {
    InteractiveMessageComponent, LocationMessageComponent, MediaMessageComponent, TextMessageComponent,
} from '../structures/index'
// eslint-disable-next-line import/no-cycle
import { Client } from '../whatsapp'

export class MessageManager {
    /**
     * axios instance to make http request to the whatsapp cloud API
     * @type {AxiosInstance}
     * @memberof MessageManager
     */
    private axiosClient: AxiosInstance

    /**
     * path of the messages api requests
     */
    private apiPath: string

    /**
     * Message Manager
     * @constructor
     */
    constructor(client: Client) {
        this.axiosClient = client.getRequestClient
        this.apiPath = `/${client.getVersion}/${client.getPhoneNumberId}/messages`
    }

    /**
     *
     * @param {TextMessageComponent} textComponent
     * @param {string} recipent
     * @returns {Promise<AxiosResponse | Error>}
     */
    async sendText(textComponent: TextMessageComponent, recipent: string): Promise<AxiosResponse | Error> {
        try {
            textComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, textComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async audio(audioComponent: MediaMessageComponent, recipent: string) {
        try {
            audioComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, audioComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async video(audioComponent: MediaMessageComponent, recipent: string) {
        try {
            audioComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, audioComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async document(documentComponent: MediaMessageComponent, recipent: string) {
        try {
            documentComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, documentComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async template(templateComponent: MediaMessageComponent, recipent: string) {
        try {
            templateComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, templateComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async interaction(interactiveComponent: InteractiveMessageComponent, recipent: string) {
        try {
            interactiveComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, interactiveComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async location(locationComponent: LocationMessageComponent, recipent: string) {
        try {
            locationComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, locationComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }

    async reaction(reactionComponent: MediaMessageComponent, recipent: string) {
        try {
            reactionComponent.setRecipent(recipent)
            const response = await this.axiosClient.post(this.apiPath, reactionComponent)

            return response.data
        } catch (error) {
            return new Error(error)
        }
    }
}
