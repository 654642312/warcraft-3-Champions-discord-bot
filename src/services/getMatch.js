const fetch = require("node-fetch").default;

const getMatch = async id => {
	const response = await fetch(`https://statistic-service.w3champions.com/api/matches/${id}`);
	const data = await response.json();
	return data;
};

module.exports = getMatch;
