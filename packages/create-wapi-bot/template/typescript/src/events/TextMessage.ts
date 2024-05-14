import { type TextMessageEvent, TextMessage } from '@wapijs/wapi.js'

export default async function (message: TextMessageEvent) {
	console.log(message)
	await message.reply({
		message: new TextMessage({
			text: "Hello, World!",
		}),
	})
}
