import { type Client } from '../../client'
import { BaseManager } from '../base'
import { type PhoneNumberManagerInterface } from './interface'

/**
 * Represents a manager for handling phone numbers.
 * @implements {PhoneNumberManagerInterface}
 * @class PhoneNumberManager
 * @extends {BaseManager}
 */
export class PhoneNumberManager extends BaseManager implements PhoneNumberManagerInterface {
	/**
	 * Creates a new instance of PhoneNumberManager.
	 * @param props - The properties for initializing the PhoneNumberManager.
	 */
	constructor(props: { client: Client }) {
		super(props.client)
	}

	/**
	 * Sends a verification code to the specified phone number.
	 * @param phoneNumber - The phone number to send the verification code to.
	 * @returns A promise that resolves to a boolean indicating if the verification code was sent successfully.
	 */
	async sendVerificationCode(phoneNumber: string) {
		console.log(phoneNumber)
		await Promise.resolve(false)
		return false
	}

	/**
	 * Verifies the provided verification code.
	 * @param code - The verification code to verify.
	 * @returns A promise that resolves to a boolean indicating if the verification code is valid.
	 */
	async verifyCode(code: string) {
		console.log(code)
		await Promise.resolve(true)
		return true
	}
}
