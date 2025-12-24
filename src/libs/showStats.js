const { getPlayerByName } = require("../services/index");
const { FOUR_V_FOUR_AT_GAMEMODE } = require("./helper");

const showStats = async (player, server) => {
  const races = await getPlayerByName(player, server);
  return { player, races };
};

async function findStatsAndGamemode(playerName, gameMode) {
  const gameModeStats = await getPlayerByName(playerName);

  const stats = gameModeStats.filter((d) => d.gameMode == gameMode);
  const gameModes = gameModeStats.filter((d) => d.gameMode != gameMode);
  const gameModeWithout4v4AtDuplicate = [];
  let fourVFourAtAlreadyExists = false;
  for (const mode of gameModes) {
    if (mode.gameMode == FOUR_V_FOUR_AT_GAMEMODE && !fourVFourAtAlreadyExists) {
      fourVFourAtAlreadyExists = true;
      gameModeWithout4v4AtDuplicate.push(mode);
    } else if (mode.gameMode != FOUR_V_FOUR_AT_GAMEMODE) {
      gameModeWithout4v4AtDuplicate.push(mode);
    }
  }
  return { stats, gameModeWithout4v4AtDuplicate };
}

module.exports = { showStats, findStatsAndGamemode };
