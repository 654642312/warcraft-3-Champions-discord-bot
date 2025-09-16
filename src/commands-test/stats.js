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
      /*
      const regEx = /^\w+#\d+$/i;

      if (id !== /\d/gi && !server && !regEx.test(player)) {
        if (id === "america") {
          indexLeague = 1;
          let stats = await getPlayerByName(player, 10);
          return await playerByName(player, stats, message, indexLeague);
        } else {
          let stats = await getPlayerByName(player, 20);
          return await playerByName(player, stats, message, indexLeague);
        }
      }

      if (id === "america") {
        player = player.replace(/#/gi, "%23");
        server = "america";
        indexLeague = 1;
      } else if (!id || id === "europe") {
        player = player.replace(/#/gi, "%23");
        server = "europe";
        indexLeague = 2;
      }
*/

      let objectPlayer = await showStats(player, 20);
      const embed = await playerEmbed(
        objectPlayer.player,
        objectPlayer.stats,
        indexLeague
      );
      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
