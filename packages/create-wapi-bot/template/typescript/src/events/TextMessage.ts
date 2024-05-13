import { type TextMessageEvent } from '@wapijs/wapi.js'

export default async function (message: TextMessageEvent) {
	console.log(message)
	await message.reply({

	})
}
