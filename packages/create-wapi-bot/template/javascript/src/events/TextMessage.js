export default async function (message) {
	console.log('TextMessage event:', message)
	await message.reply({
		message: new TextMessage({
			text: 'Hello, World!'
		})
	})
}
