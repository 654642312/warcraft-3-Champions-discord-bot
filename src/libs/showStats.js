const { getPlayerByName } = require("../services/index");

const showStats = async (player, server) => {
	const stats = await getPlayerByName(player, server);
	return { player, stats };
};

module.exports = showStats;
