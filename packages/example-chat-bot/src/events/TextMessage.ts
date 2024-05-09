import { type TextMessageEvent } from 'wapi.js'

export default function (message: TextMessageEvent) {
	console.log(message)
}
