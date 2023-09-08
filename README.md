<div align="center "><img src="https://media.discordapp.net/attachments/1046394448088674371/1149627540474953749/transparent_dark_mode.png?width=666&height=440" alt="wapi.js">  </div>

<!-- PROJECT SHIELDS -->
<div align="center">

<a href="">[![License](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)</a>
<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">[<img src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white">](https://www.npmjs.com/package/@whatsappjs/Wapi.js)</a>
<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>

</div>

## About

Wapi.js is a javascript module written in typescript to interact with Whatsapp cloud API in a user-friendly way.

## Packages:

-   [wapi.js]('/packages/wapi.js'): A node library to interact with WhatsApp cloud API efficiently and in a user-friendly way.

-   [@wapijs/component-builder]('/packages/component-generator): A utility package to build WhatsApp cloud API payloads.

## Features :

-   Object- Oriented
-   Single Client
-   Registering phone number with WhatsApp Business account
-   Send Messages
-   Handle Notifications via event listeners
-   Respond to notifications using event listeners

<br/><hr/><br/>

## Installation

Node.js 16 LTS version is required to use this library.

```sh
npm install wapi.js
yarn add wapi.js
pnpm install wapi.js
```

NOTE: This library doesn't hold any rights over the official Whatsapp Cloud API. It has been developed and will be maintained as an open-source project for the simplification of interaction with the WhatsApp cloud API, to build WhatsApp-based chat apps and for any other purpose cloud API serves.

<br/><hr/><br/>

## Usage :

Wanna start with your first WhatsApp application using Wapi.js library, check the [User Manual](./USER_MANUAL.md)

<br/><hr/><br/>

### Cloud API structures :

<br>

For reference visit Whatsapp Docs [here](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages)

<div align="center"> <img src="https://media.discordapp.net/attachments/1034852580091777034/1042099563063947304/image.png?width=720&height=473" alt="cloud API message structure"> </div>

### Cloud API notification payload structure :

<br>

For reference visit WhatsApp Docs [here](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components)

<div align="center "> <img src="https://media.discordapp.net/attachments/1034852580091777034/1046371179163828264/notification_payload.png?width=720&height=434" alt="cloud-api0notification-structure"> </div>

<br/><hr/><br/>

## Scripts:

```
yarn run build : To build the project
yarn run watch: To compile the project in watch mode or transpile the project
yarn run clean-install : To clean install the modules removing the previous ones
yarn run lint : TO check for the eslint errors
yarn run lint:fix : To fix the fixable eslint errors
```

<br/><hr/><br/>

## Future Scopes :

This library is in its development and pre-release phase only. If you are using this library and facing any issues and bugs, please report us by creating an issue here, Also you can contribute to this project, by visiting [Contribution Guidelines](#contribution-guidelines)

<!-- ### Future tasks : -->

<br/><hr/><br/>

## Contribution Guidelines :

Contributions are what makes the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Refer to this [Contributing.md](./CONTRIBUTING.md) if you have any difficulty in making a pull request

<br/><hr/><br/>

## Build the library from source :

-   After cloning the project in your local, run the following command to install the dependencies required by the project:

```sh
npm install
```

-   Build the project using the following command:

```sh
npm run build
```

<br/><hr/><br/>

## Installing Wapi.js from source for development purposes:

1. cd to your node project where you wanna use the library.

2. Run the following commands:

```sh
npm run install <path-to-whatsapp-js>
npm link <path-to-Wapi.js>
```

NOTE: Make sure you have already built the library using `npm run build`

<br/><hr/><br/>

## License :

Distributed under the MIT License. See [LICENCE](./LICENSE) for more information.

<br/><hr/><br/>

## Contact Information:

[Sarthak Jain](https://sarthakjdev.com) <br/>
contact.sarthakjain@gmail.com <br/>
[Twitter](https://twitter.com/sarthakjdev) <br/>
[Linkedin](https://www.linkedin.com/in/sarthakjdev)

<br/><hr/><br/>
