const { SlashCommandBuilder } = require("discord.js");
const getMatch = require("../services/getMatch");
const canvasMatch = require("../libs/canvas/canvasMatch");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("details")
    .setDescription("Display match details")
    .addStringOption((option) =>
      option.setName("match_id").setDescription("match id").setRequired(true)
    ),
  async execute(interaction, matchIdParams) {
    const matchId = interaction?.options?.getString("match_id") || matchIdParams;
    const matchFound = await getMatch(matchId);
    const image = canvasMatch(matchFound);
    return interaction.reply({ files: [image] });
  },
};
