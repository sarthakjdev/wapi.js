import "dotenv/config";
import { whatsappClient } from "./utils/client";
import { readdirSync } from "fs";
import { TextMessage } from "wapi.js";

function loadEventListeners() {
  readdirSync(`${__dirname}/src/events/`)
    .filter((file) => file.endsWith(".js"))
    .map((file) =>
      client.on(file.split(".js")[0], require(`${__dirname}/events/${file}`))
    );
}

async function init() {
  loadEventListeners();
  await client.initiate();
  // send a message to a number
  await whatsappClient.message.send({
    message: new TextMessage({ text: "hello, world!" }),
    phoneNumber: "<replace-me>",
  });
}

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

init.catch((error) => console.error(error));
