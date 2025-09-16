const herosImage = require("../../images");
const { MessageAttachment, AttachmentBuilder } = require("discord.js");
const Canvas = require("canvas");

const canvasHeroesStats = (firstHeros, secondHeroes, statsHeroes) => {
  try {
    const canvas = Canvas.createCanvas(900, 450);
    const ctx = canvas.getContext("2d");
    Canvas.registerFont("MesloLGS NF Regular.ttf", {
      family: "MesloLGS NF Regular.ttf",
    });

    ctx.drawImage(herosImage["background"], 0, 0, canvas.width, canvas.height);

    ctx.drawImage(herosImage[firstHeros[0]], 25, 25, 100, 100);

    ctx.drawImage(herosImage[firstHeros[1]], 135, 25, 100, 100);

    ctx.drawImage(herosImage[firstHeros[2]], 245, 25, 100, 100);

    ctx.drawImage(herosImage[secondHeroes[0]], 555, 25, 100, 100);

    ctx.drawImage(herosImage[secondHeroes[1]], 665, 25, 100, 100);

    ctx.drawImage(herosImage[secondHeroes[2]], 775, 25, 100, 100);

    ctx.font = '50px "MesloLGS NF Bold.ttf"';
    ctx.fillStyle = "#fff";
    ctx.fillText(Math.round(statsHeroes.winrate * 100) + "%", 400, 200);

    ctx.font = '50px "MesloLGS NF Bold.ttf"';
    ctx.fillStyle = "#fff";

    ctx.fillText(
      statsHeroes.wins + " - " + statsHeroes.losses,
      canvas.width / 2 -
        ctx.measureText(statsHeroes.wins + " - " + statsHeroes.losses).width /
          2,
      300
    );

    const attachment = new AttachmentBuilder(canvas.toBuffer(), "image.png");

    return attachment;
  } catch (err) {
    console.log(err);
  }
};

module.exports = canvasHeroesStats;
