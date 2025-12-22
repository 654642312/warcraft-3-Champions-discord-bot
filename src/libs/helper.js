function helperBattleTag(player) {
  const str = player.split("%");
  const playerNameEncode = encodeURIComponent(str[0]);
  return `${playerNameEncode}%${str[1]}`;
}

function displayWinrate(winrate) {
  const percentageFormat = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(winrate);
  return percentageFormat;
}

module.exports = {
  helperBattleTag,
  displayWinrate,
};
