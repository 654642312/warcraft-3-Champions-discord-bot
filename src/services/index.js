const fetch = require("node-fetch");
const { helperBattleTag } = require("../libs/helper");

const getDataRankings = async (seccion, server) => {
  const response = await fetch(
    `https://statistic-service.w3champions.com/api/ladder/${seccion}?gateWay=${server}&gameMode=1&season=${process.env.SEASON}`
  );
  return await response.json();
};

const getMatches = async (server) => {
  const response = await fetch(
    `https://statistic-service.w3champions.com/api/matches/ongoing?offset=0&gateway=${server}&pageSize=50&gameMode=1`
  );
  return await response.json();
};

const getMatch = async (player) => {
  const response = await fetch(
    `https://statistic-service.w3champions.com/api/matches/ongoing/${player}`
  );
  return await response.json();
};

const getStats = async (player, server) => {
  const response = await fetch(
    `https://statistic-service.w3champions.com/api/players/${player}/game-mode-stats?gateWay=${server}&season=${process.env.SEASON}`
  );

  const data = await response.json();
  return data;
};

const getPlayerByName = async (player, server) => {
  let response = await fetch(
    `https://statistic-service.w3champions.com/api/ladder/search?gateWay=${server}&searchFor=${player}&season=${process.env.SEASON}`
  );
  let data = await response.json();

  let playerObject = undefined;
  let playersRp = [];
  let players = [];
  let rp;
  player = player.toLowerCase();

  for (let i = 0; i < data.length; i++) {
    if (
      player.substring(0, 2) ===
        data[i].player.playerIds[0].name.toLowerCase().substring(0, 2) ||
      player === data[i].player.playerIds[0].battleTag.toLowerCase()
    ) {
      playerObject = data[i];
      break;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (
      player.substring(0, 2) ===
        data[i].player.playerIds[0].name.toLowerCase().substring(0, 2) ||
      player === data[i].player.playerIds[0].battleTag.toLowerCase()
    ) {
      players.push(data[i]);
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (
      player.toLowerCase() === data[i].player.playerIds[0].name.toLowerCase() ||
      player.toLowerCase() ===
        data[i].player.playerIds[0].battleTag.toLowerCase()
    ) {
      playerObject = data[i];
      break;
    }
  }

  if (players.length > 1) {
    for (let i = 0; i < data.length; i++) {
      playersRp.push(data[i].rankingPoints);
    }
    rp = Math.max(...playersRp);
    for (let i = 0; i < data.length; i++) {
      if (
        player.substring(0, 2) ==
          data[i].player.playerIds[0].name.toLowerCase().substring(0, 2) ||
        player == data[i].player.playerIds[0].battleTag.toLowerCase()
      ) {
        if (data[i].rankingPoints === rp) {
          playerObject = data[i];
          break;
        }
      }
    }
  }

  if (playerObject === undefined) {
    return data[0];
  }
  return playerObject;
};

const getPlayerByJustName = async (player, server) => {
  const regEx = /^\w+#\d+$/i;

  if (regEx.test(player)) {
    let response = await fetch(
      `https://statistic-service.w3champions.com/api/ladder/search?gateWay=${server}&searchFor=${helperBattleTag(
        player.replace(/#/gi, "%23")
      )}&season=${process.env.SEASON}`
    );

    let data = await response.json();
    return data[0];
  }

  let response = await fetch(
    `https://statistic-service.w3champions.com/api/ladder/search?gateWay=${server}&searchFor=${encodeURIComponent(
      player
    )}&season=${process.env.SEASON}`
  );

  let data = await response.json();
  let playerFound = undefined;

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].player.name.toLowerCase().substring(0, 2) ===
      player.toLowerCase().substring(0, 2)
    ) {
      playerFound = data[i];
      if (data[i].player.name.toLowerCase() === player.toLowerCase()) {
        console.log(data[i].player.name.toLowerCase());
        playerFound = data[i];
        break;
      }
    }
  }

  if (playerFound === undefined) {
    return data[0];
  }

  return playerFound;
};

const getLeagues = async () => {
  const response = await fetch(
    `https://statistic-service.w3champions.com/api/ladder/league-constellation?season=${process.env.SEASON}`
  );
  return await response.json();
};

const getStatsHeros = async (hero1, hero2, hero3, hero4, hero5, hero6) => {
  try {
    const response = await fetch(
      `https://statistic-service.w3champions.com/api/w3c-stats/heroes-winrate?first=${hero1}&second=${hero2}&third=${hero3}&opFirst=${hero4}&opSecond=${hero5}&opThird=${hero6}`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getScore = async (playerOne, playerTwo, server) => {
  try {
    let response = await fetch(
      `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=${process.env.SEASON}`
    );
    let data = await response.json();

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=14`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=13`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=12`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=11`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=10`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=9`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=8`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=7`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=6`
      );
      data = await response.json();
    }

    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=5`
      );
      data = await response.json();
    }
    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=4`
      );
      data = await response.json();
    }
    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=3`
      );
      data = await response.json();
    }
    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=2`
      );
      data = await response.json();
    }
    if (data.matches.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/matches/search?playerId=${playerOne}&gateway=${server}&offset=0&opponentId=${playerTwo}&pageSize=50&gameMode=1&season=1`
      );
      data = await response.json();
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getDataRankings,
  getMatches,
  getMatch,
  getStats,
  getLeagues,
  getPlayerByName,
  getStatsHeros,
  getScore,
  getPlayerByJustName,
};
