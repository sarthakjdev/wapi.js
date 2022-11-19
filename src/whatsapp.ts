/* eslint-disable import/no-cycle */
import { AxiosInstance } from 'axios'
import { createAxiosInstance } from './utils/axiosClient'
import { MessageManager } from './managers/messageManager'
import { ClientOptions } from './doc/IClient'
import { MediaManager } from './managers/mediaManager'
import { PhoneNumberManager } from './managers/phoneNumberManager'
import { PhoneNumber } from './doc/IPhoneNumber'

/**
 * main class to instantiate the whatsapp.js lib
 * @class
 * @export
 */
export class Client {
    /**
     * base url of the whatsapp API
     * @type {string}
     * @private
     * @memberof Client
     */
    private static baseURL = 'https://graph.facebook.com'

    /**
     * access token required to authorize the whatsapp cloud api access
     * @type {string}
     * @private
     * @memberof Client
     */
    private token: string

    /**
     * bussiness account id to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof Client
     */
    private business_account_id: string

    /**
     * phone number id to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof Client
     */
    private phone_numbers: PhoneNumber[]

    /**
     * phone number to use
     * @type {PhoneNumber}
     * @memberof Client
     */
    private phoneNumberInUse: PhoneNumber

    /**
     * version of APi to use
     * @type {string}
     * @private
     * @memberof Client
     */
    private version?: string | 'v15.0'

    /**
     * axios instance to make http request to whatsapp cloud API
     * @private
     * @memberof Client
     */
    private axiosClient: AxiosInstance

    /**
     * message manager to manage the sending and replyig to messages
     * @memberof Client
     */
    public message?: MessageManager

    /**
     * media manager to manage the upload and deletion of media
     * @memberof Client
     */
    public media?: MediaManager

    /**
     * to manage the phone number to be used with the whatsapp cloud api
     * @memberof Client
     */
    public phones?: PhoneNumberManager

    /**
     * to get the version of api associated with the instantiated clinet of the lib
     * @getter
     * @memberof Client
     */
    public get getVersion(): string {
        return this.version
    }

    /**
     * to get the instance of axios client to make http request
     * @public
     * @getter
     * @memberof Client
     */
    public get getRequestClient(): AxiosInstance {
        return this.axiosClient
    }

    /**
     * to get the phone nummber id, associated with the instiated client of the lib
     * @getter
     * @memberof Client
     */
    public get getPhoneNumbers(): PhoneNumber[] {
        return this.phone_numbers
    }

    /**
     * get phone number in usage
     * @getter
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
     * @returns {Client}
     */
    public addPhoneNumber(phone: PhoneNumber): this {
        this.phone_numbers.push(phone)

        return this
    }

    /**
     * get the whatsapp business account id of the meta app
     * @type {string}
     * @returns {string} business_account_id
     * @memberof Client
     */
    public get getBusinessAccountId(): string {
        return this.business_account_id
    }

    /**
     * remove the phone number from the client
     * @param {string | PhoneNumber} phone
     * @memberof Client
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
     */
    constructor(options: ClientOptions) {
        this.token = options.token
        this.business_account_id = options.business_account_id
        if (options.phone_number || options.phone_number_id) this.setPhoneNumberInUse(options.phone_number || options.phone_number_id)
        this.version = options.version
        this.axiosClient = createAxiosInstance(`${Client.baseURL}/${options.version}`, this.token)
        this.media = new MediaManager(this)
        this.phones = new PhoneNumberManager(this)
        this.phones.getPhoneNumbers()
        this.message = new MessageManager(this)
    }
}
