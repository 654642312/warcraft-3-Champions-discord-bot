const { SlashCommandBuilder } = require("discord.js");
const { helpEmbed } = require("../libs/embed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays help information"),

  async execute(interaction) {
    const commandHelp = helpEmbed();
    return interaction.reply({ embeds: [commandHelp] });
  },
};
