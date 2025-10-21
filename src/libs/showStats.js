const { getPlayerByName } = require("../services/index");

const showStats = async (player, server) => {
	const races = await getPlayerByName(player, server);
	return { player, races };
};

module.exports = showStats;
