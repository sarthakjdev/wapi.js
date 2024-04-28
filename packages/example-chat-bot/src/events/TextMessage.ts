import { type TextMessageEvent } from '@wapijs/wapi.js/dist/cjs/src/webhook/events/text'

export default function (message: TextMessageEvent) {
	console.log(message)
}
