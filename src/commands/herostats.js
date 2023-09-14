const { getStatsHeros } = require("../services");
const canvasHeroesStats = require("../libs/canvas/canvasHeroesStats");

const heroesNames = {
  bm: "blademaster",
  blademaster: "blademaster",
  sh: "shadowhunter",
  shadowhunter: "shadowhunter",
  tc: "taurenchieftain",
  taurenchieftain: "taurenchieftain",
  fs: "farseer",
  farseer: "farseer",
  dk: "deathknight",
  dk: "deathknight",
  deathknight: "deathknight",
  lich: "lich",
  dl: "dreadlord",
  dreadlord: "dreadlord",
  cl: "cryptlord",
  cryptlord: "cryptlord",
  dh: "demonhunter",
  demonhunter: "demonhunter",
  kotg: "keeperofthegrove",
  keeperofthegrove: "keeperofthegrove",
  potm: "priestessofthemoon",
  priestessofthemoon: "priestessofthemoon",
  warden: "warden",
  paladin: "paladin",
  pala: "paladin",
  pa: "paladin",
  pn: "paladin",
  pd: "paladin",
  am: "archmage",
  archmage: "archmage",
  mk: "mountainking",
  mountainking: "mountainking",
  blm: "sorceror",
  bloodmage: "sorceror",
  bem: "beastmaster",
  beastmaster: "beastmaster",
  fl: "avatarofflame",
  firelord: "avatarofflame",
  dr: "bansheeranger",
  darkranger: "bansheeranger",
  nsw: "seawitch",
  naga: "seawitch",
  pb: "pandarenbrewmaster",
  pandarenbrewmaster: "pandarenbrewmaster",
  panda: "pandarenbrewmaster",
  tinker: "tinker",
  alchemist: "alchemist",
  alch: "alchemist",
  pl: "pitlord",
  pitlord: "pitlord",
  undefined: "none",
  all: "all"
};


module.exports = {
  name: "statshero",
  alias: ["herostats"],
  run: async (client, message, args) => {
    try {
      let firstHeroes = [];
      let secondHeroes = [];
      let index = args.indexOf("v");

      if(!args[0]){
        return message.channel.send("you must write at least one hero's name")
      }

      if (args.find(arg => arg === "vs")) {
        index = args.indexOf("vs");
        for (let i = 0; i < 7; i++) {
          if (i < index && args[i]) {
            firstHeroes.push(args[i]);
          }
          else if(!args[i]){
            firstHeroes.push("all");
          }
          if (i > index && args[i]) {
            secondHeroes.push(args[i]);
          }
          else if(!args[i]){
            secondHeroes.push("all");
          }
        }
        const stats = await getStatsHeros(
          heroesNames[firstHeroes[0]],
          heroesNames[firstHeroes[1]],
          heroesNames[firstHeroes[2]],
          heroesNames[secondHeroes[0]],
          heroesNames[secondHeroes[1]],
          heroesNames[secondHeroes[2]]
        );

        if (Math.round(stats.winrate * 100) === 0) {
          return message.channel.send("stats not found");
        }
        const image = canvasHeroesStats(firstHeroes, secondHeroes, stats);
        return message.channel.send({ files: [image] });

      }

      if (index === -1) {
        for (let i = 0; i < 6; i++) {
          if (args[i]) {
            firstHeroes.push(args[i]);
          } else if (i < 3) {
            firstHeroes.push("all");
          } else {
            secondHeroes.push("all");
          }
        }
        const stats = await getStatsHeros(
          heroesNames[firstHeroes[0]],
          heroesNames[firstHeroes[1]],
          heroesNames[firstHeroes[2]],
          heroesNames[secondHeroes[0]],
          heroesNames[secondHeroes[1]],
          heroesNames[secondHeroes[2]]
        );
        if (Math.round(stats.winrate * 100) === 0) {
          return message.channel.send("stats not found");
        }
        const image = canvasHeroesStats(firstHeroes, secondHeroes, stats);
        return message.channel.send({ files: [image] });
      }

      for (let i = 0; i < args.length; i++) {
        if (i < index) {
          firstHeroes.push(args[i]);
        }
        if (i > index) {
          secondHeroes.push(args[i]);
        }
      }

      const stats = await getStatsHeros(
        heroesNames[firstHeroes[0]],
        heroesNames[firstHeroes[1]],
        heroesNames[firstHeroes[2]],
        heroesNames[secondHeroes[0]],
        heroesNames[secondHeroes[1]],
        heroesNames[secondHeroes[2]]
      );
      if (Math.round(stats.winrate * 100) === 0) {
        return message.channel.send("stats not found");
      }
      const image = canvasHeroesStats(firstHeroes, secondHeroes, stats);
      return message.channel.send({ files: [image] });
    } catch (err) {
      console.log(err);
    }
  }
};
