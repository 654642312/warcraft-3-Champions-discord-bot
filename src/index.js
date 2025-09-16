const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server on port 3000");
});

const { config } = require("dotenv");

config();

const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  Partials,
  REST,
  Routes,
} = require("discord.js");
const eventsMessage = require("./events/message");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.User,
    Partials.Message,
    Partials.GuildMember,
  ],
});

client.commands = new Collection(); 

const commandsPath = path.join(__dirname, 'commands-test');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`The Command ${filePath} is missing a required "data" or "execute" property.`)
    }
}

async function deployCommands() {
  const commands = [];

  const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands-test"))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands-test/${file}`);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `WARNING: The command at ${file} is missing a required 'data' or 'execute' property.`
      );
    }
  }

  const rest = new REST().setToken(process.env.DISCORD_TOKEN);

  console.log(`Started refreshing application slash commands globally.`);

  const data = await rest.put(
    Routes.applicationCommands('751448461877968960'),
    { body: commands }
  );
}

client.on(Events.ClientReady, async () => {
  client.user.setActivity("!help");
  await deployCommands();
  console.log("bot is ready!!!!!!!!!");
});

eventsMessage(client);
client.login(process.env.DISCORD_TOKEN);
