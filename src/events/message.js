const { prefix } = require("../config.json");
const channels = require("../channels");
const { Events } = require("discord.js");

const channelAllowed = (channelId) => {
  for (let i = 0; i < channels.length; i++) {
    if (channelId === channels[i]) {
      return true;
    }
  }
  return false;
};

const eventsMessage = (client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (!interaction.isChatInputCommand()) return;
      if (!channelAllowed(interaction.channel.id)) return;

      const command = client.commands.get(interaction.commandName);

      if (!command) {
        return;
      }
      await command.execute(interaction);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = eventsMessage;
