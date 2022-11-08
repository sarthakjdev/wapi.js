import { createAxiosInstance } from '@utils/axiosClient'
import { AxiosInstance, AxiosRequestHeaders } from 'axios'
import {
    TextComponent, LocationComponent, InteractiveComponent, MediaComponent,
} from './structures'

/**
 * main class to instantiate the whatsapp client sdk
 * @class
 * @export
 */
export class WhatsappClient {
    /**
     * base url of the whatsapp API
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private baseURL = ''

    /**
     * access token required to authorize the whatsapp cloud api access
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private token: string

    /**
     * mobile number to be used by whatsapp cloud api
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private mobile_number: string

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
    private phone_number_id: string

    /**
     * version of APi to use
     * @type {string}
     * @private
     * @memberof WhatsappClient
     */
    private version: string

    /**
     * axios client for whatsapp cloud API
     * @type {AxiosInstance}
     * @private
     * @memberof WhatsappClient
     */
    private axiosClient: AxiosInstance = createAxiosInstance(this.baseURL, {} as AxiosRequestHeaders)

    /**
     * constructor to build instance of whatsapp client
     * @constructor
     * @param {WhatsappClient} options
     */
    constructor(options: WhatsappClient) {
        this.token = options.token
        this.phone_number_id = options.phone_number_id
        this.mobile_number = options.mobile_number
        this.business_account_id = options.business_account_id
        this.version = options.version
    }
}
