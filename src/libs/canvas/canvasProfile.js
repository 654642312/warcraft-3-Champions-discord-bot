const herosImages = require("../../images");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const fetch = require("node-fetch").default;
const getStatsByMode = require("../../services/getstatsbymode");
const getStatsByRace = require("../../services/getstatsbyrace");

const leagues = {
	league0: "GRANDMASTER",
	league1: "MASTER",
	league2: "DIAMOND",
	league3: "PLATINUM",
	league4: "GOLD",
	league5: "SILVER",
	league6: "BRONZE",
};

const raceOfPicture = {
  race32: "SPECIAL",
  race1: "HUMAN",
  race2: "ORC",
  race4: "NIGHT_ELF",
  race8: "UNDEAD",
  race0: "RANDOM",
  race16: "TOTAL"
}

const modes = {
  mode1: "1v1",
  mode2: "2v2",
  mode6: "2v2 AT",
  mode4: "4v4",
  mode5: "FFA"
}

const _modes = {
  mode1: "1v1",
  mode2: "2v2",
  mode6: "2v2 AT",
  mode4: "4v4",
  mode5: "FFA"
}

const races = {
  race1: "HUMAN",
  race8: "UNDEAD",
  race2: "ORC",
  race4: "NIGHT ELF",
  race0: "RANDOM"
}

const EGameMode = {
  UNDEFINED: undefined,
  GM_1ON1: 1,
  GM_2ON2: 2,
  GM_2ON2_AT: 6,
  GM_4ON4: 4,
  GM_FFA: 5,
}

function combineStats(gm2v2s) {
    return gm2v2s.reduce(
      (a, b) => ({
        gameMode: EGameMode.GM_2ON2_AT,
        gateWay: b.gateWay,
        wins: b.wins + a.wins,
        losses: b.losses + a.losses,
        games: b.games + a.games,
        winrate: 0,
        mmr: b.mmr + a.mmr,
        rankingPoints: b.rankingPoints + a.rankingPoints,
        leagueId: 0,
        leagueOrder: 0,
        division: 0,
        rank: b.rank + a.rank, // just so there is something in there, and it gets displayed if at least one team is ranked
        season: b.season,
        quantile: b.quantile + a.quantile,
      }),
      {
        wins: 0,
        losses: 0,
        games: 0,
        winrate: 0,
        mmr: 0,
        rank: 0,
        rankingPoints: 0,
        quantile: 0,
      }
    );
  }

  function gameModeStatsCombined(statsByMode) {
    let gm2v2s = [];
    for (var i = 0; i < statsByMode.length; i++) {
      if (statsByMode[i].gameMode === EGameMode.GM_2ON2_AT) {
        gm2v2s.push(statsByMode[i]);
      }
    }
    if (gm2v2s.length === 0) return statsByMode;
    const combindes2v2 = combineStats(gm2v2s);
    combindes2v2.winrate =
      combindes2v2.wins / (combindes2v2.wins + combindes2v2.losses);
    combindes2v2.mmr = Math.round(combindes2v2.mmr / gm2v2s.length);
    combindes2v2.rankingPoints = Math.round(
      combindes2v2.rankingPoints / gm2v2s.length
    );
    combindes2v2.quantile = combindes2v2.quantile / gm2v2s.length;
    const gm1v1 = statsByMode.filter((g) => g.gameMode === EGameMode.GM_1ON1);
    const ffa = statsByMode.find((g) => g.gameMode === EGameMode.GM_FFA);
    const gm2v2 = statsByMode.find((g) => g.gameMode === EGameMode.GM_2ON2);
    const gm4v4 = statsByMode.find((g) => g.gameMode === EGameMode.GM_4ON4);
    return [...gm1v1, gm2v2, combindes2v2, gm4v4, ffa].filter((i) => i); //filter out nulls
  }

  const getLeagueMode = (modeStat) => {
    return (`gameModes.${EGameMode[modeStat.gameMode]}`);
  }

  const league = (modeStat) => {
    return modeStat.leagueId;
  }

  const getSeason = (modeStat) => {
    return modeStat.season;
  }

const canvasProfile = async (stats) => {
  Canvas.registerFont('MesloLGS NF Regular.ttf', { family: 'MesloLGS NF Regular.ttf' });

  let statsByMode = await getStatsByMode(stats.player1Id.replace(/#/gi, "%23"), 20);
  const statsByRace = await getStatsByRace(stats.player1Id.replace(/#/gi, "%23"), 20);

	const canvas = Canvas.createCanvas(960, 557);

  const response = await fetch(`https://statistic-service.w3champions.com/api/personal-settings/${stats.player1Id.replace(/#/gi, "%23")}`);
  const personalSettings = await response.json();

	const ctx = canvas.getContext("2d");
  
	ctx.drawImage(herosImages["background" + statsByMode[0].race], 0, 0, canvas.width, canvas.height);

  ctx.font = "12px MesloLGS NF Bold.ttf";
	ctx.fillStyle = "#fff";

  let avatar;
    if(personalSettings.profilePicture.isClassic){
      avatar = herosImages[`avatarTrue${personalSettings.profilePicture.race}${personalSettings.profilePicture.pictureId.toString().slice(-2)}`]
    }else if(!personalSettings.profilePicture.isClassic){
      avatar = herosImages[`avatarFalse${personalSettings.profilePicture.race}${personalSettings.profilePicture.pictureId.toString().slice(-2)}`]
    }

  statsByMode = gameModeStatsCombined(statsByMode);

  const newCardLeague = [];
  
  for(let i = 0; i < statsByMode.length; i++){
    if(newCardLeague.length > 0){
      if(!newCardLeague.every(item => item.gameMode === statsByMode[i].gameMode)){
        newCardLeague.push(statsByMode[i]);
      }
    }else{
      newCardLeague.push(statsByMode[i]);
    }
  }

  if(newCardLeague.length >= 1){
    const stats = newCardLeague[0]

    const modeAndLeague = 250 / 2 - ctx.measureText(`${_modes["mode"+stats.gameMode]} ${leagues["league" + stats.gameMode]}`).width /2

    const rankNumber = 250 / 2 - ctx.measureText(`${stats.rank}`).width /2

    const mmrAndRP = 250 / 2 - ctx.measureText(`MMR: ${stats.mmr} RP ${stats.rankingPoints}`).width /2

    ctx.beginPath();
    ctx.rect(250, 120, 215, 190);
    ctx.stroke();

    ctx.drawImage(herosImages[leagues["league" + stats.leagueId]], 320, 90, 70, 70);


    ctx.font = "15px MesloLGS NF Bold.ttf";
    ctx.fillText(`${_modes["mode"+stats.gameMode]} ${leagues["league" + stats.gameMode]}`, modeAndLeague + 220, 215);
    ctx.fillText(`Rank: ${stats.rank}`, rankNumber + 200, 237);
    ctx.fillText(`MMR: ${stats.mmr} RP ${stats.rankingPoints}`, mmrAndRP+215, 253);
  }

  if(newCardLeague.length >= 2){
    const stats = newCardLeague[1]

    const modeAndLeague = 250 / 2 - ctx.measureText(`${_modes["mode"+stats.gameMode]} ${leagues["league" + stats.gameMode]}`).width /2

    const rankNumber = 250 / 2 - ctx.measureText(`${stats.rank}`).width /2

    const mmrAndRP = 250 / 2 - ctx.measureText(`MMR: ${stats.mmr} RP ${stats.rankingPoints}`).width /2

    ctx.beginPath();
    ctx.rect(500, 120, 215, 190);
    ctx.stroke();

    ctx.drawImage(herosImages[leagues["league" + stats.leagueId]], 570, 90, 70, 70);


    ctx.font = "15px MesloLGS NF Bold.ttf";
    ctx.fillText(`${_modes["mode"+stats.gameMode]} ${leagues["league" + stats.gameMode]}`, modeAndLeague + 470, 215);
    ctx.fillText(`Rank: ${stats.rank}`, rankNumber + 450, 237);
    ctx.fillText(`MMR: ${stats.mmr} RP ${stats.rankingPoints}`, mmrAndRP+475, 253);
  }

  if(newCardLeague.length >= 3){
    const stats = newCardLeague[2]

    const modeAndLeague = 250 / 2 - ctx.measureText(`${_modes["mode"+stats.gameMode]} ${leagues["league" + stats.gameMode]}`).width /2

    const rankNumber = 250 / 2 - ctx.measureText(`${stats.rank}`).width /2

    const mmrAndRP = 250 / 2 - ctx.measureText(`MMR: ${stats.mmr} RP ${stats.rankingPoints}`).width /2

    ctx.beginPath();
    ctx.rect(750, 120, 215, 190);
    ctx.stroke();

    ctx.drawImage(herosImages[leagues["league" + stats.leagueId]], 970, 90, 70, 70);


    ctx.font = "15px MesloLGS NF Bold.ttf";
    ctx.fillText(`${_modes["mode"+stats.gameMode]} ${leagues["league" + stats.gameMode]}`, modeAndLeague + 720, 215);
    ctx.fillText(`Rank: ${stats.rank}`, rankNumber + 700, 237);
    ctx.fillText(`MMR: ${stats.mmr} RP ${stats.rankingPoints}`, mmrAndRP+725, 253);
  }

  ctx.font = "12px MesloLGS NF Bold.ttf";

  let y = 309;
  let line = 303;
  ctx.drawImage(avatar, 30, 120, 153, 153);
  statsByMode.map(stats => {
    line += 41;
    y += 41;
    
    if(stats.race || stats.race === 0){
      ctx.drawImage(herosImages[`race${stats.race}`], 547, y, 30, 30);
    }
    ctx.fillText(modes[`mode${stats.gameMode}`], 520, y+20);
    ctx.fillText(stats.mmr, 715, y+20);
    ctx.fillText(stats.rankingPoints, 789, y+20);
    ctx.beginPath(); 
    ctx.moveTo(250,line);
    ctx.lineTo(960,line);
    ctx.stroke();
    ctx.fillText(stats.wins + " - " + stats.losses, 629, y+10);
    ctx.fillText(Math.round(stats.winrate * 100) + "%", 633, y+30);
  });


  y = 309;
  statsByRace.map(stats => {
    y += 41;
    ctx.drawImage(herosImages[`race${stats.race}`], 252, y, 30, 30);
    ctx.fillText(stats.wins + " - " + stats.losses, 344, y+20);
    ctx.fillText("( "+ Math.round(stats.winrate * 100) + "% )", 415, y+20);
  });
  
	const attachment = new MessageAttachment(canvas.toBuffer(), "image.png");
	return attachment;
};

module.exports = canvasProfile;