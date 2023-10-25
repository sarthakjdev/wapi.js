import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type PhoneNumberManagerInterface } from './interface'

export class PhoneNumberManager extends BaseManager implements PhoneNumberManagerInterface {
    constructor(props: {client: Client}){
        super(props.client)

    }
}
