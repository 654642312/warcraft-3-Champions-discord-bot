const Canvas = require("canvas");
const herosImages = require("../../images");
const { MessageAttachment } = require("discord.js");

module.exports = (human, orc, undead, nightElf, map) => {
  Canvas.registerFont('MesloLGS NF Regular.ttf', { family: 'MesloLGS NF Regular.ttf' });
	const canvas = Canvas.createCanvas(1000, 1200);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(herosImages["background20"], 0, 0, canvas.width, canvas.height);

	for (let x = 0; x <= 1000; x = x + 200) {
		ctx.moveTo(x, 200);
		ctx.lineTo(x, 1200);
	}

	for (let y = 200; y <= 1200; y = y + 200) {
		ctx.moveTo(0, y);
		ctx.lineTo(1200, y);
	}
	//map
	ctx.drawImage(herosImages[map], 400, 0, 200, 200);

	//races images
	ctx.drawImage(herosImages[`race${human.race}`], 0, 400, 200, 200);
	ctx.drawImage(herosImages[`race${orc.race}`], 0, 600, 200, 200);
	ctx.drawImage(herosImages[`race${undead.race}`], 0, 800, 200, 200);
	ctx.drawImage(herosImages[`race${nightElf.race}`], 0, 1000, 200, 200);

	ctx.drawImage(herosImages[`race${human.race}`], 200, 200, 200, 200);
	ctx.drawImage(herosImages[`race${orc.race}`], 400, 200, 200, 200);
	ctx.drawImage(herosImages[`race${undead.race}`], 600, 200, 200, 200);
	ctx.drawImage(herosImages[`race${nightElf.race}`], 800, 200, 200, 200);

	//ratios
	ctx.font = "50px MesloLGS NF Bold.ttf";
	ctx.fillStyle = "#fff";

	ctx.fillText(" - ",250, 520);
	ctx.fillText(`${(human.winLosses[2].winrate * 100).toFixed()}%`, 460, 520);
	ctx.fillText(`${(human.winLosses[3].winrate * 100).toFixed()}%`, 660, 520);
	ctx.fillText(`${(human.winLosses[4].winrate * 100).toFixed()}%`, 860, 520);

	ctx.fillText(`${(orc.winLosses[1].winrate * 100).toFixed()}%`, 250, 710);
	ctx.fillText(" - ", 460, 710);
	ctx.fillText(`${(orc.winLosses[3].winrate * 100).toFixed()}%`, 660, 710);
	ctx.fillText(`${(orc.winLosses[4].winrate * 100).toFixed()}%`, 860, 710);

	ctx.fillText(`${(undead.winLosses[1].winrate * 100).toFixed()}%`, 250, 900);
	ctx.fillText(`${(undead.winLosses[2].winrate * 100).toFixed()}%`, 460, 900);
	ctx.fillText(" - ", 660, 900);
	ctx.fillText(`${(undead.winLosses[4].winrate * 100).toFixed()}%`, 860, 900);

	ctx.fillText(`${(nightElf.winLosses[1].winrate * 100).toFixed()}%`, 250, 1090);
	ctx.fillText(`${(nightElf.winLosses[2].winrate * 100).toFixed()}%`, 460, 1090);
	ctx.fillText(`${(nightElf.winLosses[3].winrate * 100).toFixed()}%`, 660, 1090);
	ctx.fillText(" - ", 860, 1090);

	ctx.strokeStyle = "#fff";
	ctx.stroke();

	const attachment = new MessageAttachment(canvas.toBuffer(), "image.png");
	return attachment;
};
