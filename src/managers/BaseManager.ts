/* eslint-disable import/no-cycle */
import { WhatsappClient } from '../client/index'

export class BaseManager {
    client: WhatsappClient

    constructor(client: WhatsappClient) {
        this.client = client
    }
}
