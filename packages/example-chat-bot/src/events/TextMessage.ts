import { type TextMessageEvent } from '@wapijs/wapi.js'

export default function (message: TextMessageEvent) {
	console.log(message)
}
