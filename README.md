<div align="center">
<br />
<p align="center">
<a href="https://wapijs.co"><img src="https://www.wapijs.co/logo.png" alt="wapi.js"  height="200" width="260" /></a>
</p>
<br />
<p>
  <a href="/"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" /></a>
  <a href="https://www.npmjs.com/package/@whatsappjs/Wapi.js"><img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white" /></a>
  <a href=""><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" /></a>
</p>
</div>

## 📌 Status

Beta Version - This library is not stable right now. It is currently in beta version. Report issues [here](https://github.com/sarthakjdev/wapi.js/issues).

## 📖 About

Wapi.js is a JavaScript module, written in TypeScript, designed to interact with the WhatsApp cloud API in a user-friendly manner.

### Packages:

- [**wapi.js**]('/packages/wapi.js'): Interact with WhatsApp cloud API with simple and easy to manage code.
- [**create-wapi-bot**]('/packages/create-wapi-bot): Start with the development of your whatsapp bot using this starter template utility.

## ✨ Features

- Object-Oriented Architecture
- Single Client Model
- Send Messages with least configuration
- Event Listener for Notifications (support both User and System Notifications)
- Upload Media to whatsapp servers
- Reply and React to incoming messages.

## 💻 Installation

Ensure you have Node.js 18 LTS version to use this library.

```sh
npm install wapi.js
yarn add wapi.js
pnpm install wapi.js
```

> Note: This library is not affiliated with the official WhatsApp Cloud API or does not act as any official solution provided the the Meta Inclusive Private Limited, this is just a open source library built for developers to support them in building whatsapp cloud api based chat bots easily.

## 🚀 Usage

- Kickstart your first WhatsApp application with Wapi.js. Check the [User Manual](./USER_MANUAL.md).
- You can check out the example whatsapp bot here. [Example Chat bot](./packages/example-chat-bot/)
- You can get started with the development of your bot with this starter template utility.

```sh
pnpm create-wapi-bot
```

## 🔗 References

- **Message Structures**: Refer to the WhatsApp Docs [here](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages).

- **Notification Payloads**: Details can be found [here](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components).

## 🔗 Other Links

- [Website](https://wapijs.co)
- [Documentation](https://wapijs.co/docs)

## Example Usage

```typescript
import { Client, TextMessage } from 'wapi.js'

	const whatsappClient = new Client({
		apiAccessToken: process.env.WHATSAPP_API_ACCESS_TOKEN,
		businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
		phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
		port: 8080,
		webhookEndpoint: '/webhook',
		webhookSecret: process.env.WHATSAPP_WEBHOOK_SECRET
	})

	await whatsappClient.message.send({
		message: new TextMessage({ text: 'hiii, this is wapijs library' }),
		phoneNumber: 'XXXXXXXXXX'
	})

	whatsappClient.on('TextMessage', (message) => {
		console.log(message)
	})

	whatsappClient.on('TextMessage', async (message) => {
		message.reply({
			message: new TextMessage({ text: 'hiii, this is wapijs library' }),,
		})
	})

	whatsappClient.initiate()
```

## 🤝 Contribution Guidelines

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed guidelines, check [Contributing.md](./CONTRIBUTING.md).

## 📜 License

Distributed under the Apache 2.0 License. View [LICENSE](./LICENSE).

## 📞 Contact

- [Sarthak Jain](https://sarthakjdev.com)
- Email: sarthak@softlancer.co
- [Twitter](https://twitter.com/sarthakjdev) | [LinkedIn](https://www.linkedin.com/in/sarthakjdev)

Note: This library is a part of a open source product building initiative by [Softlancer](https://github.com/softlancerhq), and this repository would soon be moved under the same organisation.
