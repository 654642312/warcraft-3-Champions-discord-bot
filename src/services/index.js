const fetch = require('node-fetch');

const getDataRankings = async (seccion, server) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/ladder/${seccion}?gateWay=${server}&gameMode=1&season=${process.env.SEASON}`);
    return response.json();
}

const getMatches = async (server) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/matches/ongoing?offset=0&gateway=${server}&pageSize=50&gameMode=1`);
    return response.json();
}

const getMatch = async (player) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/matches/ongoing/${player}`);
    return response.json();
}

const getStats = async (player, server) => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/players/${player}/game-mode-stats?gateWay=${server}&season=${process.env.SEASON}`);
    return response.json();
}

const getPlayerByName = async (player, server) => {
    let response = await fetch(`https://statistic-service.w3champions.com/api/ladder/search?gateWay=${server}&searchFor=${player}&season=${process.env.SEASON}`);
    return response.json();
}

const getLeagues = async () => {
    const response = await fetch(`https://statistic-service.w3champions.com/api/ladder/league-constellation?season=${process.env.SEASON}`);
    return response.json();
}

module.exports = { getDataRankings, getMatches, getMatch, getStats, getLeagues, getPlayerByName };