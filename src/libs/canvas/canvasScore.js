const herosImages = require("../../images");
const { AttachmentBuilder } = require("discord.js");
const Canvas = require("canvas");

const canvasScore = async (score) => {
  Canvas.registerFont("MesloLGS NF Regular.ttf", { family: "Meslo" });
  
  const canvas = Canvas.createCanvas(900, 450);
  const ctx = canvas.getContext("2d");
  const middle = canvas.width / 2;

  ctx.drawImage(herosImages["background"], 0, 0, canvas.width, canvas.height);

  const imgSize = 150;
  const imgY = 60;
  
  ctx.drawImage(
    herosImages["race" + score.racePlayerOne], 
    225 - (imgSize / 2), 
    imgY, 
    imgSize, 
    imgSize
  );
  
  ctx.drawImage(
    herosImages["race" + score.racePlayerTwo], 
    675 - (imgSize / 2), 
    imgY, 
    imgSize, 
    imgSize
  );

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center"; 

  ctx.font = "50px Meslo";
  const namesY = 280; 
  ctx.fillText(score.namePlayerOne, 225, namesY);
  ctx.fillText(score.namePlayerTwo, 675, namesY);

  ctx.font = "bold 65px Meslo"; 
  const scoreText = `${score.scorePlayerOne} - ${score.scorePlayerTwo}`;
  ctx.fillText(scoreText, middle, 380);

  const attachment = new AttachmentBuilder(canvas.toBuffer(), "image.png");
  return attachment;
};

module.exports = canvasScore;
