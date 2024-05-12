
import { whatsappClient } from "./utils/client";
import { TextMessage } from '@wapijs/wapi.js'

async function init() {
    whatsappClient.on('Ready', () => {
        console.log('Client is ready')
    })

    whatsappClient.on('TextMessage', async (message) => {
        console.log('Text Message')
        await message.reply({
            message: new TextMessage({
                text: 'Hello, World!'
            })
        })
    })



    whatsappClient.on('Error', (error) => {
        console.error(error)
    })

    whatsappClient.initiate()
}