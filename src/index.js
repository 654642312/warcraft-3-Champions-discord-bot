const express = require("express");
const { findW3CPlayer } = require("./services");

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
const { EUROPE_SERVER } = require("./libs/helper");

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

const commandsPath = path.join(__dirname, "commands-test");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `The Command ${filePath} is missing a required "data" or "execute" property.`
    );
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
    Routes.applicationCommands("751448461877968960"),
    { body: commands }
  );
}

client.on(Events.ClientReady, async () => {
  client.user.setActivity("!help");
  await deployCommands();
  console.log("bot is ready!!!!!!!!!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    (interaction.commandName === "stats" ||
      interaction.commandName === "score") &&
    interaction.isAutocomplete()
  ) {
    const focusedValue = interaction.options.getFocused();

    if (focusedValue.length < 3) {
      return await interaction.respond([]);
    }

    try {
      const players = await findW3CPlayer(focusedValue, EUROPE_SERVER);
      const choices = players
        .map((player) => {
          return {
            name: player.battleTag,
            value: player.battleTag,
          };
        })
        .slice(0, 25);

      await interaction.respond(choices);
    } catch (error) {
      console.log(error);
    }
  }

  if (interaction.isStringSelectMenu()) {
    if (interaction.customId.startsWith("stats_mode_")) {
      const [unkwon, unkwn2, player] = interaction.customId.split("_");

      const [gameModeSelected] = interaction.values[0].split("_");

      const statsCommand = client.commands.get("stats");

      statsCommand.execute(interaction, player, gameModeSelected);
      return;
    }
  }
});

eventsMessage(client);
client.login(process.env.DISCORD_TOKEN);
