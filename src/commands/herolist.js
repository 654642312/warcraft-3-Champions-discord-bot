const { MessageEmbed } = require("discord.js");

const heroesNames = {
	bm: "blademaster",
	sh: "shadowhunter",
	tc: "taurenchieftain",
	fs: "farseer",
	dk: "deathknight",
	lich: "lich",
	dl: "dreadlord",
	cl: "cryptLord",
	kotg: "keeperofthegrove",
	dh: "demonhunter",			
	potm: "priestessofthemoon",
	warden: "warden",
	paladin: "paladin",
	am: "archmage",
	mk: "mountainking",
	blm: "sorceror",
	bem: "beastmaster",
	fl: "firelord",
	dr: "bansheeranger",
	nsw: "seawitch",
	pb: "padarenbrewmaster",
	tinker: "tinker",
	alchemist: "alchemist",
	pl: "pitlord",
	undefined: "none"
};

module.exports = {
	name: "herolist",
	alias: [],
	run: (client, message, args) => {
		try {
			const embed = new MessageEmbed().setColor("#0099ff").setTitle("Hero List");

			for (const property in heroesNames) {
				if (property !== "undefined") {
					embed.addField(property, heroesNames[property], true);
				}
			}
			return message.channel.send({embeds: [embed]});
		} catch (err) {
			console.log(err);
		}
	}
};
