/* eslint-disable import/no-cycle */
import { AxiosInstance } from 'axios'
import EventEmitter from 'node:events'
import { NotificationManager } from '../managers/NotificationManager'
import { createAxiosInstance } from '../utils/axiosClient'
import { MessageManager } from '../managers/MessageManager'
import { ClientOptions } from './doc/IClientOptions'
import { MediaManager } from '../managers/MediaManager'
import { PhoneNumberManager } from '../managers/PhoneNumberManager'
import { PhoneNumber } from './doc/IPhoneNumber'
import { CLIENT_STATUS } from './doc/IClientStatus'

/**
 * main class to instantiate the whatsapp.js lib
 * @class
 * @export
 */

export class WhatsappClient extends EventEmitter {
    /**
     * base url of the whatsapp API
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private static baseURL = 'https://graph.facebook.com'

    /**
     * access token required to authorize the whatsapp cloud api access
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private token: string

    /**
     * status of the client
     * @type {string}
     * @memberof WhatsappClient
     */
    public status: CLIENT_STATUS

    /**
     * bussiness account id to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private business_account_id: string

    /**
     * phone number id to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private phone_numbers: PhoneNumber[]

    /**
     * phone number to use
     * @type {PhoneNumber}
     * @memberof WhatsappClient
     */
    private phoneNumberInUse: PhoneNumber

    /**
     * version of APi to use
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private version?: string | 'v15.0'

    /**
     * axios instance to make http request to whatsapp cloud API
     * @private
     * @memberof WhatsappClient
     */
    private axiosClient: AxiosInstance

    /**
     * message manager to manage the sending and replyig to messages
     * @memberof WhatsappClient
     */
    public message?: MessageManager

    /**
     * media manager to manage the upload and deletion of media
     * @memberof WhatsappClient
     */
    public media?: MediaManager

    /**
     * to manage the phone number to be used with the whatsapp cloud api
     * @memberof WhatsappClient
     */
    public phones?: PhoneNumberManager

    public notification?: NotificationManager

    /**
     * to get the version of api associated with the instantiated clinet of the lib
     * @getter
     * @memberof WhatsappClient
     */
    public get getVersion(): string {
        return this.version
    }

    /**
     * to get the instance of axios client to make http request
     * @public
     * @getter
     * @memberof WhatsappClient
     */
    public get getRequestClient(): AxiosInstance {
        return this.axiosClient
    }

    /**
     * to get the phone nummber id, associated with the instiated client of the lib
     * @getter
     * @memberof WhatsappClient
     */
    public get getPhoneNumbers(): PhoneNumber[] {
        return this.phone_numbers
    }

    /**
     * get the whatsapp business account id of the meta app
     * @type {string}
     * @returns {string} business_account_id
     * @memberof WhatsappClient
     */
    public get getBusinessAccountId(): string {
        return this.business_account_id
    }

    /**
     * set the token in the client
     */
    private set setToken(token: string) {
        this.token = token
    }

    /**
     * remove the phone number from the client
     * @param {string | PhoneNumber} phone
     * @memberof WhatsappClient
     */
    public removePhoneNumber(phone: PhoneNumber | string) {
        // eslint-disable-next-line consistent-return, array-callback-return
        const phoneNumbersArr = this.phone_numbers.filter((ph) => {
            if (phone instanceof String) {
                if (ph.phone_number_id !== phone) return phone
            } else {
                if (ph !== phone) return phone

                return phone
            }
        })

        this.phone_numbers = phoneNumbersArr
    }

    /**
     * constructor to build instance of whatsapp client
     * @constructor
     * @param {ClientOptions} options
     * @memberof WhatsappClient
     */
    constructor(options: ClientOptions) {
        super({ captureRejections: true })
        this.business_account_id = options.business_account_id
        if (options.phone_number || options.phone_number_id) this.setPhoneNumberInUse(options.phone_number || options.phone_number_id)
        this.version = options.version
        this.axiosClient = createAxiosInstance(`${WhatsappClient.baseURL}/${options.version}`, this.token)
        this.media = new MediaManager(this)
        this.phones = new PhoneNumberManager(this)
        this.message = new MessageManager(this)
        this.notification = new NotificationManager(this)
    }

    /**
     * get phone number in usage
     * @getter
     * @memberof WhatsappClient
     */
    public get getPhoneNumberInUse(): string {
        return this.phoneNumberInUse?.phone_number_id
    }

    /**
    * set the phone number in use
    * @param {PhoneNumber} phone
    */
    public setPhoneNumberInUse(phone: PhoneNumber | string): this {
        if (phone instanceof String) this.phoneNumberInUse = { phone_number_id: phone as string }
        else this.phoneNumberInUse = phone as PhoneNumber

        return this
    }

    /**
     * add oregistered phone number to the client
     * @param {PhoneNumber} phone
     * @returns {WhatsappClient}
     * @memberof WhatsappClient
     */
    public addPhoneNumber(phone: PhoneNumber): this {
        this.phone_numbers.push(phone)

        return this
    }

    /**
     *  inititae the client, after all the event listeners and messaging has been attached with the client
     * @param {string} token
     * @returns {WhatsappClient}
     * @memberof WhatsappClient
     */
    async login(token: string): Promise<this> {
        this.setToken = token
        this.axiosClient.defaults.headers.Authorization = `Bearer ${this.token}`
        await this.notification.initiate()

        return this
    }

    /**
     * checks if the client is ready or not
     * @returns {boolean}
     * @memberof WhatsappClient
     */
    isReady(): boolean {
        if (this.status === CLIENT_STATUS.READY) return true

        return false
    }
}
