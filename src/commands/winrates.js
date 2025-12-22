const canvasWinrates = require("../libs/canvas/canvasWinrates");
const getWinrates = require("../services/getStatsOfPatchMapsAndRace");

const mmrOfLeagues = {
	grandmaster: 2200,
	master: 2000,
	adept: 1800,
	diamond: 1600,
	platinum: 1400,
  	platin: 1400,
	gold: 1200,
	silver: 1000,
	bronze: 1000,
	grass: 1000,
	undefined: 0
};

const maps = {
	az: "amazonia",
  amazonia: "amazonia",
	ts: "terenasstand",
  tslv: "terenasstand",
  terenasstand: "terenasstand",
	tm: "twistedmeadows",
  twistedmeadows: "twistedmeadows",
  twisted: "twistedmeadows",
	ni: "northernisles",
  northernisles: "northernisles",
	ch: "concealedhill",
  concealedhill: "concealedhill",
  tidehunters: "tidehunters",
  th: "tidehunters",
  ruinsofazshara: "ruinsofazshara",
  ruin: "ruinsofAzshara",
  roa: "ruinsofazshara",
	lr: "lastrefuge",
  lastrefuge: "lastrefuge",
	ei: "echoisles",
  echoisles: "echoisles",
  tr: "turtlerock",
  turtlerock: "turtlerock",
  autumnleaves: "autumnleaves",
  al: "autumnleaves",
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
	alias: ["wr", "winrate"],
	run: async (client, message, args) => {
		try {
			const mmr = args[0];
			const map = args[1];
			let ratio;
			let image;
			const dataOfWinrate = await getWinrates();
			if ((!mmr && !map) || (mmr && map)) {
				ratio = getRatio(mmr, map, dataOfWinrate);
				image = canvasWinrates(ratio[1], ratio[2], ratio[3], ratio[4], maps[map]);
			} else if (typeof mmrOfLeagues[mmr] !== "number") {
				ratio = getRatio(undefined, mmr, dataOfWinrate);
				console.log(ratio)
				image = canvasWinrates(ratio[1], ratio[2], ratio[3], ratio[4], maps[mmr]);
			} else {
				ratio = getRatio(mmr, undefined, dataOfWinrate);
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
