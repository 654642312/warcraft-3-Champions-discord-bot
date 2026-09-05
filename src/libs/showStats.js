const { getPlayerByName } = require("../services/index");
const { FOUR_V_FOUR_AT_GAMEMODE } = require("./helper");

const showStats = async (player, server) => {
  const races = await getPlayerByName(player, server);
  return { player, races };
};

async function findStatsAndGamemode(playerName, gameMode) {
  gameMode = Number(gameMode);
  const gameModeStats = await getPlayerByName(playerName);
  const stats = gameModeStats.filter((d) => d.gameMode === gameMode);
  const gameModes = gameModeStats.filter((d) => d.gameMode !== gameMode);
  
  const gameModeWithoutDuplicate = gameModes.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.gameMode === value.gameMode)
  );
  return { stats, gameModeWithoutDuplicate };
}

module.exports = { showStats, findStatsAndGamemode };
