const { getPlayerByName } = require("../services");
const { playerByName } = require("../libs/embed");
const { playerEmbed } = require("../libs/embed");
const showStats = require("../libs/showStats");
const { SlashCommandBuilder } = require("discord.js");
const { ActionRowBuilder } = require("discord.js");
const { StringSelectMenuBuilder } = require("discord.js");
const {
  GAMEMODES,
  ONE_V_ONE_GAMEMODE_NAME,
  ONE_V_ONE_GAMEMODE,
  TWO_V_TWO_GAMEMODE_NAME,
  TWO_V_TWO_GAMEMODE,
  FOUR_V_FOUR_GAMEMODE_NAME,
  FOUR_V_FOUR_GAMEMODE,
  ONE_V_ONE_ROC_GAMEMODE_NAME,
  ONE_V_ONE_ROC_GAMEMODE,
  ONE_V_ONE_LEGION_TD_NAME,
  ONE_V_ONE_LEGION_TD,
  FOUR_V_FOUR_LEGION_TD_NAME,
  FOUR_V_FOUR_LEGION_TD,
  MINIDOTA_GAMEMODE_NAME,
  MINIDOTA_GAMEMODE,
} = require("../libs/helper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Shows player profile stats")
    .addStringOption((option) =>
      option
        .setName("battletag")
        .setDescription("The player's battletag")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("gamemode")
        .setDescription("The game mode")
        .setRequired(false)
        .addChoices(
          { name: ONE_V_ONE_GAMEMODE_NAME, value: ONE_V_ONE_GAMEMODE },
          { name: TWO_V_TWO_GAMEMODE_NAME, value: TWO_V_TWO_GAMEMODE },
          { name: FOUR_V_FOUR_GAMEMODE_NAME, value: FOUR_V_FOUR_GAMEMODE },
          { name: ONE_V_ONE_ROC_GAMEMODE_NAME, value: ONE_V_ONE_ROC_GAMEMODE },
          { name: ONE_V_ONE_LEGION_TD_NAME, value: ONE_V_ONE_LEGION_TD },
          { name: FOUR_V_FOUR_LEGION_TD_NAME, value: FOUR_V_FOUR_LEGION_TD },
          { name: MINIDOTA_GAMEMODE_NAME, value: MINIDOTA_GAMEMODE }
        )
    ),

  async execute(interaction) {
    try {
      let player = interaction.options.getString("battletag");
      let indexLeague = 2;

      const selectorMode = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`stats_mode_${player}`)
          .setPlaceholder("1 VS 1")
          .addOptions([
            {
              label: "Duelo 1v1",
              value: "1v1",
              description: "Estadísticas de 1 contra 1",
            },
            {
              label: "Dobles 2v2",
              value: "2v2",
              description: "Estadísticas de 2 contra 2",
            },
            {
              label: "Equipos 3v3",
              value: "3v3",
              description: "Estadísticas de 3 contra 3",
            },
          ])
      );

      const selectorSesson = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`season_${player}`)
          .setPlaceholder("Season 22")
          .addOptions([
            {
              label: "Duelo 1v1",
              value: "1v1",
              description: "Estadísticas de 1 contra 1",
            },
            {
              label: "Dobles 2v2",
              value: "2v2",
              description: "Estadísticas de 2 contra 2",
            },
            {
              label: "Equipos 3v3",
              value: "3v3",
              description: "Estadísticas de 3 contra 3",
            },
          ])
      );

      let objectPlayer = await showStats(player, 20);
      const embed = await playerEmbed(
        objectPlayer.player,
        objectPlayer.races,
        indexLeague
      );

      return interaction.reply({ embeds: [embed], components: [selectorMode, selectorSesson] });
    } catch (err) {
      console.log(err);
    }
  },
};
