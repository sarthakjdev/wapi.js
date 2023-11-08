import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type PhoneNumberManagerInterface } from './interface'

export class PhoneNumberManager extends BaseManager implements PhoneNumberManagerInterface {
	constructor(props: { client: Client }) {
		super(props.client)
	}

	async sendVerificationCode(phoneNumber: string) {
		console.log(phoneNumber)
		await Promise.resolve(false)
		return false
	}

	async verifyCode(code: string) {
		console.log(code)
		await Promise.resolve(true)
		return true
	}
}
