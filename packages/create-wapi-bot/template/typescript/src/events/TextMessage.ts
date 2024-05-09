import { type TextMessageEvent } from 'wapi.js'

export default async function (message: TextMessageEvent) {
	console.log(message)
	await  message.reply({
		
	})
}
