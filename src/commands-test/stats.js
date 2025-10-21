const { getPlayerByName } = require("../services");
const { playerByName } = require("../libs/embed");
const { playerEmbed } = require("../libs/embed");
const showStats = require("../libs/showStats");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Shows player profile stats")
    .addStringOption((option) =>
      option.setName("battletag").setDescription("The player's battletag").setRequired(true)
    ),

  async execute(interaction) {
    try {
      let player = interaction.options.getString("battletag");
      let indexLeague = 2;

      let objectPlayer = await showStats(player, 20);

      const embed = await playerEmbed(
        objectPlayer.player,
        objectPlayer.races,
        indexLeague
      );
      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
