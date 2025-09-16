const fetch = require("node-fetch").default;

module.exports = async () => {
  const response = await fetch(
    "https://statistic-service.w3champions.com/api/w3c-stats/map-race-wins"
  );
  const data = await response.json();
  return data;
};
