const EUROPE_SERVER = 20
const ONE_V_ONE_GAMEMODE = '1'
const TWO_V_TWO_GAMEMODE = '2'
const FOUR_V_FOUR_GAMEMODE = '4'
const ONE_V_ONE_ROC_GAMEMODE = '301'
const ONE_V_ONE_LEGION_TD = '203'
const FOUR_V_FOUR_LEGION_TD = '202'
const MINIDOTA_GAMEMODE = '1501'

const ONE_V_ONE_GAMEMODE_NAME = '1 VS 1'
const TWO_V_TWO_GAMEMODE_NAME = '2 VS 2'
const FOUR_V_FOUR_GAMEMODE_NAME = '4 VS 4'
const ONE_V_ONE_ROC_GAMEMODE_NAME = 'RoC 1 VS 1'
const ONE_V_ONE_LEGION_TD_NAME = 'Legion TD 1 VS 1'
const FOUR_V_FOUR_LEGION_TD_NAME = 'Legion TD 4 VS 4'
const MINIDOTA_GAMEMODE_NAME = 'MINIDOTA 3 VS 3'



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
  EUROPE_SERVER,
  ONE_V_ONE_GAMEMODE,
  TWO_V_TWO_GAMEMODE,
  FOUR_V_FOUR_GAMEMODE,
  ONE_V_ONE_ROC_GAMEMODE,
  ONE_V_ONE_LEGION_TD,
  FOUR_V_FOUR_LEGION_TD,
  MINIDOTA_GAMEMODE,
  ONE_V_ONE_GAMEMODE_NAME,
  TWO_V_TWO_GAMEMODE_NAME,
  FOUR_V_FOUR_GAMEMODE_NAME,
  ONE_V_ONE_ROC_GAMEMODE_NAME,
  ONE_V_ONE_LEGION_TD_NAME,
  FOUR_V_FOUR_LEGION_TD_NAME,
  MINIDOTA_GAMEMODE_NAME
};
