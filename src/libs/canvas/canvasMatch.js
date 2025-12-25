const herosImages = require("../../images");
const Canvas = require("canvas");
const { AttachmentBuilder } = require("discord.js");

const canvasMatch = (stats) => {
  Canvas.registerFont("MesloLGS NF Regular.ttf", { family: "Meslo" });
  const canvas = Canvas.createCanvas(900, 700);
  const ctx = canvas.getContext("2d");

  const unitsKilled = "Units Killed";
  const unitsProduced = "Units Produced";
  const goldMined = "Gold Mined";
  const lumberHarvested = "Lumber Harvested";
  const upkeepLost = "Upkeep Lost";
  const largestArmy = "Largest Army";

  ctx.drawImage(herosImages["background"], 0, 0, canvas.width, canvas.height);

  ctx.font = "45px Meslo";
  ctx.fillStyle = "#85BB65";
  ctx.fillText(
    stats.match.teams[0].players[0].battleTag.replace(/#\w+/gi, ""),
    canvas.width / 2 -
      ctx.measureText(stats.playerScores[0].battleTag.replace(/#\w+/gi, ""))
        .width /
        2,
    50
  );

  ctx.font = "45px Meslo";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    stats.playerScores[0].battleTag.replace(/#\w+/gi, ""),
    180 -
      ctx.measureText(stats.playerScores[0].battleTag.replace(/#\w+/gi, ""))
        .width /
        2,
    100
  );

  ctx.font = "45px Meslo";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    stats.playerScores[1].battleTag.replace(/#\w+/gi, ""),
    canvas.width -
      180 -
      ctx.measureText(stats.playerScores[1].battleTag.replace(/#\w+/gi, ""))
        .width /
        2,
    100
  );

  //hero1 team1
  ctx.drawImage(
    herosImages[
      stats.playerScores[0].heroes[2]
        ? stats.playerScores[0].heroes[2].icon
        : undefined
    ],
    100 - 90 / 2,
    180,
    90,
    90
  );
  ctx.fillText(
    stats.playerScores[0].heroes[2]
      ? stats.playerScores[0].heroes[2].level
      : "",
    100 - ctx.measureText("1").width / 2,
    330
  );

  //hero2 team1
  ctx.drawImage(
    herosImages[
      stats.playerScores[0].heroes[1]
        ? stats.playerScores[0].heroes[1].icon
        : undefined
    ],
    190 - 90 / 2,
    180,
    90,
    90
  );
  ctx.fillText(
    stats.playerScores[0].heroes[1]
      ? stats.playerScores[0].heroes[1].level
      : "",
    190 - ctx.measureText("1").width / 2,
    330
  );

  //hero3 team1
  ctx.drawImage(
    herosImages[
      stats.playerScores[0].heroes[0]
        ? stats.playerScores[0].heroes[0].icon
        : undefined
    ],
    280 - 90 / 2,
    180,
    90,
    90
  );
  ctx.fillText(
    stats.playerScores[0].heroes[0]
      ? stats.playerScores[0].heroes[0].level
      : "",
    280 - ctx.measureText("1").width / 2,
    330
  );

  //hero1 team2
  ctx.drawImage(
    herosImages[
      stats.playerScores[1].heroes[0]
        ? stats.playerScores[1].heroes[0].icon
        : undefined
    ],
    canvas.width - 280 - 90 / 2,
    180,
    90,
    90
  );
  ctx.fillText(
    stats.playerScores[1].heroes[0]
      ? stats.playerScores[1].heroes[0].level
      : "",
    canvas.width - 280 - ctx.measureText("1").width / 2,
    330
  );

  //hero2 team2
  ctx.drawImage(
    herosImages[
      stats.playerScores[1].heroes[1]
        ? stats.playerScores[1].heroes[1].icon
        : undefined
    ],
    canvas.width - 190 - 90 / 2,
    180,
    90,
    90
  );
  ctx.fillText(
    stats.playerScores[1].heroes[1]
      ? stats.playerScores[1].heroes[1].level
      : "",
    canvas.width - 190 - ctx.measureText("1").width / 2,
    330
  );

  //hero3 team2
  ctx.drawImage(
    herosImages[
      stats.playerScores[1].heroes[2]
        ? stats.playerScores[1].heroes[2].icon
        : undefined
    ],
    canvas.width - 100 - 90 / 2,
    180,
    90,
    90
  );
  ctx.fillText(
    stats.playerScores[1].heroes[2]
      ? stats.playerScores[1].heroes[2].level
      : "",
    canvas.width - 100 - ctx.measureText("1").width / 2,
    330
  );

  ctx.drawImage(
    herosImages[stats.match.mapName.replaceAll(" ", "")],
    canvas.width / 2 - 180 / 2,
    180,
    180,
    180
  );

  ctx.font = "30px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(
    unitsKilled + ": " + stats.playerScores[0].unitScore.unitsKilled,
    canvas.width / 6 - ctx.measureText(unitsKilled).width / 2,
    390
  );
  ctx.fillText(
    stats.playerScores[1].unitScore.unitsKilled + ": " + unitsKilled,
    canvas.width - 260 - ctx.measureText(unitsKilled).width / 2,
    390
  );

  ctx.fillText(
    unitsProduced + ": " + stats.playerScores[0].unitScore.unitsProduced,
    canvas.width / 6 - ctx.measureText(unitsKilled).width / 2,
    430
  );

  ctx.fillText(
    stats.playerScores[1].unitScore.unitsProduced + " :" + unitsProduced,
    canvas.width - 260 - ctx.measureText(unitsKilled).width / 2,
    430
  );

  ctx.fillText(
    goldMined + ": " + stats.playerScores[0].resourceScore.goldCollected,
    canvas.width / 6 - ctx.measureText(unitsKilled).width / 2,
    470
  );
  ctx.fillText(
    stats.playerScores[1].resourceScore.goldCollected + " " + goldMined,
    canvas.width - 260 - ctx.measureText(unitsKilled).width / 2,
    470
  );

  ctx.fillText(
    lumberHarvested +
      ": " +
      stats.playerScores[0].resourceScore.lumberCollected,
    canvas.width / 6 - ctx.measureText(unitsKilled).width / 2,
    510
  );
  ctx.fillText(
    stats.playerScores[1].resourceScore.lumberCollected +
      " :" +
      lumberHarvested,
    canvas.width - 260 - ctx.measureText(unitsKilled).width / 2,
    510
  );

  ctx.fillText(
    upkeepLost + ": " + stats.playerScores[0].resourceScore.goldUpkeepLost,
    canvas.width / 6 - ctx.measureText(unitsKilled).width / 2,
    560
  );
  ctx.fillText(
    stats.playerScores[1].resourceScore.goldUpkeepLost + " :" + upkeepLost,
    canvas.width - 260 - ctx.measureText(unitsKilled).width / 2,
    560
  );

  ctx.fillText(
    largestArmy + ": " + stats.playerScores[0].unitScore.largestArmy,
    canvas.width / 6 - ctx.measureText(unitsKilled).width / 2,
    600
  );
  ctx.fillText(
    stats.playerScores[0].unitScore.largestArmy + " :" + largestArmy,
    canvas.width - 260 - ctx.measureText(unitsKilled).width / 2,
    600
  );

  const attachment = new AttachmentBuilder(canvas.toBuffer(), "image.png");
  return attachment;
};

module.exports = canvasMatch;
