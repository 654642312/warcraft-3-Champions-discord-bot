const { prefix } = require("../config.json");
const channels = require("../channels");
const { Events } = require("discord.js");

const channelAllowed = (message) => {
  for (let i = 0; i < channels.length; i++) {
    if (message.channel.id === channels[i]) {
      return true;
    }
  }
  return false;
};

const eventsMessage = (client) => {
  client.on(Events.MessageCreate, async (message) => {
    try {
      if (!message.content.startsWith(prefix)) return;
      if (!channelAllowed(message)) return;

      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      let command = args.shift().toLowerCase();

      let commandFound =
        client.commands.get(command) ||
        client.commands.find((c) => c.alias && c.alias.includes(command));

      if (args.length > 0)
        args.forEach((arg, i) => (args[i] = args[i].toLowerCase()));
      if (!commandFound) return;

      return commandFound.run(client, message, args);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = eventsMessage;
