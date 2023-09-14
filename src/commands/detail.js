const getMatch = require("../services/getMatch");
const canvasMatch = require("../libs/canvas/canvasMatch");

module.exports = {
	name: "detail",
	alias: ["d"],
	run: async (client, message, args) => {
		try {
      if(!args[0]){
        return message.channel.send('you should send the match id')
      }
			const id = args[0];
			const matchFound = await getMatch(id);
			const image = canvasMatch(matchFound);
			return message.channel.send({ files: [image] });
		} catch (err) {
			console.log(err);
      return message.channel.send("error");
		}
	}
};
