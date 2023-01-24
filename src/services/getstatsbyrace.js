const fetch = require("node-fetch");

const getStatsByRace = async (player, server) => {
  try {
    let response = await fetch(
      `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=${process.env.SEASON}`
    );
    let data = await response.json();

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=13`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=12`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=11`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=10`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=9`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=8`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=7`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=6`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=5`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=4`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=3`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=2`
      );
      data = await response.json();
    }

    if (data.length === 0) {
      response = await fetch(
        `https://statistic-service.w3champions.com/api/players/${player}/race-stats?gateWay=${server}&season=1`
      );
      data = await response.json();
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getStatsByRace;
