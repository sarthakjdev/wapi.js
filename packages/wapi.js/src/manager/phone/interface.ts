import { type BaseManagerInterface } from '../base/interface'

export interface PhoneNumberManagerInterface extends BaseManagerInterface {
	sendVerificationCode: (phoneNumber: string) => Promise<boolean>
	verifyCode: (code: string) => Promise<boolean>
}
