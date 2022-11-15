/* eslint-disable import/no-cycle */
import { AxiosInstance } from 'axios'
import { createAxiosInstance } from './utils/axiosClient'
import { MessageManager } from './managers/messageManager'
import { ClientOptions } from './doc/IClient'
import { MediaManager } from './managers/mediaManager'
import { PhoneNumberManager } from './managers/phoneNumberManager'
import { RegistrationManager } from './managers/registrationManager'
import { WebhookManager } from './managers/webhookManager'

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
     * mobile number to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof Client
     */
    private mobile_number: string

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
    private _phone_number_id: string

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
    public get getPhoneNumberId(): string {
        return this._phone_number_id
    }

    /**
     * to get the version of api associated with the instantiated clinet of the lib
     * @getter
     * @memberof Client
     */
    public get getVersion(): string {
        return this.version
    }

    public message?: MessageManager

    public media?: MediaManager

    public static phones? : PhoneNumberManager = new PhoneNumberManager()

    public register? : RegistrationManager

    public webhook? : WebhookManager

    /**
     * constructor to build instance of whatsapp client
     * @constructor
     * @param {ClientOptions} options
     */
    constructor(options: ClientOptions) {
        this.token = options.token
        this._phone_number_id = options.phone_number_id
        this.mobile_number = options.mobile_number
        this.business_account_id = options.business_account_id
        this.version = options.version
        this.axiosClient = createAxiosInstance(Client.baseURL, this.token)
        this.media = new MediaManager(this)
        this.message = new MessageManager(this)
        this.register = new RegistrationManager(this)
        this.webhook = new WebhookManager(this)
    }
}
