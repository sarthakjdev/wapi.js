import { whatsappClient } from "./utils/client.js"
import { TextMessage } from '@wapijs/wapi.js'
import { readdir } from 'node:fs/promises'


async function loadEventListeners() {
    const events = await readdir(`${__dirname}/events/`)
    events
        .filter((file) => file.endsWith('.js'))
        .map((file) => whatsappClient.on(file.split('.js')[0], require(`${__dirname}/events/${file}`).default))
}

async function init() {
    loadEventListeners()
    // send a message to a number
    await whatsappClient.message.send({
        message: new TextMessage({ text: 'hello, world!' }),
        phoneNumber: '<replace-me>'
    })
    await whatsappClient.initiate()
}

init().catch(error => console.error(error))

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error)
})




