const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server on port 3000")

});

const { config } = require("dotenv");

config();

const { Client, Collection, Intents } = require("discord.js");
const eventsMessage = require("./events/message");
const fs = require("fs");
const path = require("path");

const intents = new Intents(513);
const client = new Client({ intents });

client.commands = new Collection();

let files = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (let file of files) {
  let command = require("./commands/" + file);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  client.user.setActivity("!help");
  console.log("bot is ready!!!!!!!!!");
});

eventsMessage(client);
client.login(process.env.DISCORD_TOKEN)