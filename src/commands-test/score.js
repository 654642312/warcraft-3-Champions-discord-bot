const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./help");
const { getScore } = require("../services");
const getScoreOfMatches = require("../libs/getScoreOfMatches");
const canvasScore = require("../libs/canvas/canvasScore");
const { ActionRowBuilder } = require("discord.js");
const { StringSelectMenuBuilder } = require("discord.js");
const { RACES } = require("../libs/helper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("score")
    .setDescription("display score between two players")
    .addStringOption((option) =>
      option
        .setName("first_battletag")
        .setDescription("the player's battletag")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("second_battletag")
        .setDescription("the player's battletag")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async execute(interaction) {
    const player1 = interaction?.options?.getString("first_battletag");
    const player2 = interaction?.options?.getString("second_battletag");

    const matches = await getScore(
      player1.replace("#", "%23"),
      player2.replace("#", "%23")
    );

    if (matches.matches.length === 0) {
      return interaction.reply({
        content: "stats not found",
      });
    }
    
    const score = getScoreOfMatches(
      matches.matches,
      player1.replace(/%23/gi, "#"),
      player2.replace(/%23/gi, "#")
    );
    const image = await canvasScore(score);

    const matchSelector = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`details`)
        .setPlaceholder("details about the matches")
        .addOptions(matches.matches.map((match) => ({
          label: `${match.teams[0].players[0].name} (${RACES[match.teams[0].players[0].race]}) vs ${match.teams[1].players[0].name} (${RACES[match.teams[1].players[0].race]}) ${match.mapName}`,
          value: match.id
        })).slice(0,25))
    );

    return interaction.reply({
      files: [image],
      components: [matchSelector]
    });
  },
};
