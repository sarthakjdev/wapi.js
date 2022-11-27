# User Manual

This document defines how to develop your very first whatsapp chat app using the whatsapp.js lib.

## Setting up the project : 

1. Initiate the project using : 

```sh
npm init -y
```

2. Install Whastapp.js using : 

```sh
npm install whatsapp.js
```

## Getting Meta Credentials : 

1. Visit the meta developer portal apps section [here](https://developers.facebook.com/apps).
2. Click on Create App.
3. Select App type as ``Business``.
4. Add a app nmae, your email, and a optional meta business account, then click on create app.
5. Add Whatsapp product to your app.
6. Now select yoru Meta Business Account, if you haven't in the previous steps.
6. Click on `Getting started` from the left option panel.
7. Get your Access Token, test mobile number, phone number id and whatsapp business account id.

<br/><hr/><br/>

## Developing a simple whatsapp app: 

```node
import {
    TextMessageComponent, PhoneNumber, Phone, PHONE_NUMBER_STATUS, WhatsappClient, AccountAlert, EVENTS, TextPayload, TemplateMessageComponent, NotificationManager,
} from 'whatsapp.js'

const token = <your-access-tokken>
const phoneNumberId = <your-phone-number-id>
const waBusinessAccountId = <your-waba-id>
const phoneMumber = <your-test-phone-number>
const recipient = <recipent-phone-number>

const cli = new WhatsappClient({
    business_account_id: waBusinessAccountId, phone_number: phoneMumber, phone_number_id: phoneNumberId, version: 'v15.0', port: 3000,
})

cli.setPhoneNumberInUse({ name: 'okk', phone_number_id: '108945368681660', status: PHONE_NUMBER_STATUS.verified })

cli.once(EVENTS.READy, () => {
    console.log('Client ready !!')
})

// listen to notifications via event listeners
cli.on(EVENTS.TEXT_MESSAGE, (data) => {
    console.log('data ', data)
})

// create components
const text = new TextMessageComponent({ text: { body: 'I can see you' } })

// send components
cli.message.sendText(text, recipient).then()
cli.login(token).then()

```

1. Add the follwing code in index.js file.
2. Run the follwing command: 
```sh
node index.js
```