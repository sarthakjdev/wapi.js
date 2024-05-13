
import { whatsappClient } from "./utils/client";
import { AudioMessage, TextMessage } from '@wapijs/wapi.js'

function init() {
    whatsappClient.on('Ready', () => {
        console.log('Client is ready')
    })

    whatsappClient.on('TextMessage', async (message) => {
        console.log('Text Message')
        const response = await message.reply({
            message: new TextMessage({
                text: 'Hello, World!'
            })
        })
        const audioResponse = await message.reply({
            message: new AudioMessage({
                link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            })
        })

        console.log({ audioResponse })



        console.log(response)
    })






    whatsappClient.on('Error', (error) => {
        console.error(error)
    })

    whatsappClient.initiate()
}

init()