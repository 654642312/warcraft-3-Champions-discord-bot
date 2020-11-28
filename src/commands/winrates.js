const canvasWinrates = require("../libs/canvas/canvasWinrates");

const mmrOfLeagues = {
	grandmaster: 2200,
	master: 2000,
	diamond: 1800,
	platin: 1600,
	gold: 1400,
	silver: 1200,
	bronze: 1000,
	undefined: 0
};

const maps = {
	az: "amazonia",
	ts: "tenerasstand",
	tm: "twistedmeadows",
	ni: "northernisles",
	ch: "concealedhill",
	lr: "lastrefuge",
	ei: "echoisles",
	undefined: "Overall"
};

const getRatio = (mmr, map, dataOfWinrate) => {
	let data;
	for (index in dataOfWinrate) {
		if (dataOfWinrate[index].id === mmrOfLeagues[mmr]) {
			data = dataOfWinrate[index];
			break;
		}
	}
	for (index in data.patchToStatsPerModes["1.32.9"]) {
		if (data.patchToStatsPerModes["1.32.9"][index].mapName === maps[map]) {
			data = data.patchToStatsPerModes["1.32.9"][index].ratio;
			break;
		}
	}
	return data;
};

module.exports = {
	name: "winrates",
	alias: ["wr"],
	run: async (client, message, args) => {
		try {
			const mmr = args[0];
			const map = args[1];
			let ratio;
			let image;
			const { dataOfWinrate } = require("../index");

			if ((!mmr && !map) || (mmr && map)) {
				ratio = getRatio(mmr, map, dataOfWinrate);
				image = canvasWinrates(ratio[1], ratio[2], ratio[3], ratio[4], maps[map]);
			} else if (typeof mmr !== "number") {
				ratio = getRatio(undefined, mmr, dataOfWinrate);
				image = canvasWinrates(ratio[1], ratio[2], ratio[3], ratio[4], maps[mmr]);
			} else {
				ratio = getRatio(mmr, map, dataOfWinrate);
				image = canvasWinrates(ratio[1], ratio[2], ratio[3], ratio[4], maps[map]);
			}
			// hum, orc, undead, elf
			return message.channel.send(image);
		} catch (err) {
			console.log(err);
			return message.channel.send("Error");
		}
	}
};
