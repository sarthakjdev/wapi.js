import { type UnknownEventInterface } from './interface'

/**
 * @class
 * @implements UnknownEventInterface
 */
export class UnknownEvent implements UnknownEventInterface {
	code: string
	message: string
	title: string
	constructor(params: { code: string; message: string; title: string }) {
		this.code = params.code
		this.message = params.message
		this.title = params.title
	}
}
