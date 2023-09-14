const Discord = require("discord.js");
const { getLeagues } = require("../services/");
const fetch = require("node-fetch");

const emojiUnd = "<:Undead:771391362595160084>";
const emojiOrc = "<:ORC:771391078833061948>";
const emojiNe = "<:NE:771390761052012645>";
const emojiHum = "<:Hum:771391612663496725>";
const emojiRdm = "<:RDM:771392710522437653>";
const emojiGrandMaster = "<:GM:762322281371664385>";
const emojiMaster = "<:master:762322420253065216>";
const emojiDiamond = "<:Diamond:762323081041149982>";
const emojiPlatinum = "<:platinum:762322351161212969>";
const emojiGold = "<:gold:762322312321826848>";
const emojiSilver = "<:silver:762322243434053653>";
const emojiBronze = "<:Bronze:762322183589855295>";
const emojiAdept = "<:Adept:1036063381750284290>";

const raceOfPicture = {
  race32: "SPECIAL",
  race1: "HUMAN",
  race2: "ORC",
  race4: "NIGHT_ELF",
  race8: "UNDEAD",
  race0: "RANDOM",
  race16: "TOTAL",
};

const playerEmbed = async (name, stats, message, indexLeague) => {
  try {
    let embed = new Discord.MessageEmbed();
    let avatar = " ";
    let race;
    let leagueName;
    let iconRace;
    let leagues = await getLeagues();
    leagues = leagues.filter((league) => league.gameMode === 1)[0];
    for (let i = 0; i < leagues.leagues.length; i++) {
      if (stats.league === leagues.leagues[i].id) {
        leagueName = leagues.leagues[i].name;
      }
    }
    if (leagueName === "Grand Master") {
      leagueName = emojiGrandMaster;
    } else if (leagueName === "Master") {
      leagueName = emojiMaster;
    } else if (leagueName === "Adept") {
      leagueName = emojiAdept;
    } else if (leagueName === "Diamond") {
      leagueName = emojiDiamond;
    } else if (leagueName === "Platinum") {
      leagueName = emojiPlatinum;
    } else if (leagueName === "Gold") {
      leagueName = emojiGold;
    } else if (leagueName === "Silver") {
      leagueName = emojiSilver;
    } else if (leagueName === "Bronze") {
      leagueName = emojiBronze;
    }

    embed.addField("Rank", stats.rankNumber, true);
    embed.addField("Mode", "1v1", true);
    embed.addField("League", leagueName, true);

    if (stats.race === 1) {
      iconRace = emojiHum;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/HUMAN_10.jpg";
    } else if (stats.race === 2) {
      iconRace = emojiOrc;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/ORC_8.jpg";
    } else if (stats.race === 4) {
      iconRace = emojiNe;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/NIGHT_ELF_10.jpg";
    } else if (stats.race === 8) {
      iconRace = emojiUnd;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/UNDEAD_9.jpg";
    } else if (stats.race === 0) {
      iconRace = emojiRdm;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/RANDOM_9.jpg";
    }

    let tag = stats.player.playerIds[0].battleTag;
    tag = tag.replace(/#/gi, "%23");

    const response = await fetch(
      `https://statistic-service.w3champions.com/api/personal-settings/${tag}`
    );

    const personalSettings = await response.json();

    let image;

    if (personalSettings.profilePicture.isClassic) {
      image = `https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/classic/${
        raceOfPicture["race" + personalSettings.profilePicture.race]
      }_${personalSettings.profilePicture.pictureId}.jpg`;
    }
    if (
      raceOfPicture["race" + personalSettings.profilePicture.race] === "SPECIAL"
    ) {
      image = `https://w3champions.wc3.tools/prod/integration/icons/specialAvatars/SPECIAL_${personalSettings.profilePicture.pictureId}.jpg`;
    }
    if (
      personalSettings.profilePicture.isClassic === false &&
      raceOfPicture["race" + personalSettings.profilePicture.race] !== "SPECIAL"
    ) {
      image = `https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/${
        raceOfPicture["race" + personalSettings.profilePicture.race]
      }_${personalSettings.profilePicture.pictureId}.jpg`;
    }

    let battleTag = stats.player.playerIds[0].battleTag;
    battleTag = battleTag.replace(/#/gi, "%23");

    if (avatar === " ") {
      let newEmbed = new Discord.MessageEmbed();

      newEmbed
        .setColor("#0099ff")
        .setTitle(stats.player.name)
        .setThumbnail("https://www.w3champions.com/img/all.d725e22d.png")
        .addField("Message", "You have to play 5 games, GL HF!")
        .addField(
          "View profile in w3champions",
          `[Click here](https://www.w3champions.com/player/${battleTag})`
        );

      return message.channel.send({embeds: [newEmbed]});
    }

    if (stats.race === 1) {
      race = "Human";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 2) {
      race = "Orc";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 4) {
      race = "Night";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 8) {
      race = "Undead";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 0) {
      race = "Random";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    }

    embed
      .setColor("#0099ff")
      .setTitle(stats.player.name + " " + iconRace)
      .setThumbnail(image)
      .addField(
        "View profile in w3champions",
        `[Click here](https://www.w3champions.com/player/${battleTag})`
      );

    return message.channel.send({embeds: [embed]});
  } catch (error) {
    console.log(error);
    return message.channel.send(
      "This player has not played 1v1 games this season."
    );
  }
};

const playerByName = async (name, stats, message, indexLeague) => {
  try {
    let embed = new Discord.MessageEmbed();
    let avatar = " ";
    let race;
    let leagueName;
    let iconRace;

    let leagues = await getLeagues();
    const leaguesFiltered = leagues.filter(
      (league) => league.gameMode === 1
    )[0];
    for (let i = 0; i < leaguesFiltered.leagues.length; i++) {
      if (stats.league === leaguesFiltered.leagues[i].id) {
        leagueName = leaguesFiltered.leagues[i].name;
      }
    }

    if (leagueName === "Grand Master") {
      leagueName = emojiGrandMaster;
    } else if (leagueName === "Master") {
      leagueName = emojiMaster;
    } else if (leagueName === "Adept") {
      leagueName = emojiAdept;
    } else if (leagueName === "Diamond") {
      leagueName = emojiDiamond;
    } else if (leagueName === "Platinum") {
      leagueName = emojiPlatinum;
    } else if (leagueName === "Gold") {
      leagueName = emojiGold;
    } else if (leagueName === "Silver") {
      leagueName = emojiSilver;
    } else if (leagueName === "Bronze") {
      leagueName = emojiBronze;
    }

    if (stats.player.race === 1) {
      iconRace = emojiHum;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/HUMAN_10.jpg";
    } else if (stats.player.race === 2) {
      iconRace = emojiOrc;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/ORC_8.jpg";
    } else if (stats.player.race === 4) {
      iconRace = emojiNe;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/NIGHT_ELF_10.jpg";
    } else if (stats.player.race === 8) {
      iconRace = emojiUnd;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/UNDEAD_9.jpg";
    } else if (stats.player.race === 0) {
      iconRace = emojiRdm;
      avatar =
        "https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/RANDOM_9.jpg";
    }

    let tag = stats.player.playerIds[0].battleTag;
    tag = tag.replace(/#/gi, "%23");

    const response = await fetch(
      `https://statistic-service.w3champions.com/api/personal-settings/${tag}`
    );

    const personalSettings = await response.json();

    let image;

    if (personalSettings.profilePicture.isClassic) {
      image = `https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/classic/${
        raceOfPicture["race" + personalSettings.profilePicture.race]
      }_${personalSettings.profilePicture.pictureId}.jpg`;
    }
    if (
      raceOfPicture["race" + personalSettings.profilePicture.race] === "SPECIAL"
    ) {
      image = `https://w3champions.wc3.tools/prod/integration/icons/specialAvatars/SPECIAL_${personalSettings.profilePicture.pictureId}.jpg`;
    }
    if (
      personalSettings.profilePicture.isClassic === false &&
      raceOfPicture["race" + personalSettings.profilePicture.race] !== "SPECIAL"
    ) {
      image = `https://w3champions.wc3.tools/prod/integration/icons/raceAvatars/${
        raceOfPicture["race" + personalSettings.profilePicture.race]
      }_${personalSettings.profilePicture.pictureId}.jpg`;
    }

    let battleTag = stats.player.playerIds[0].battleTag;
    battleTag = battleTag.replace(/#/gi, "%23");

    if (avatar === " ") {
      let newEmbed = new Discord.MessageEmbed();

      newEmbed
        .setColor("#0099ff")
        .setTitle(stats.player.name)
        .setThumbnail("https://www.w3champions.com/img/all.d725e22d.png")
        .addField("Message", "You have to play 5 games, GL HF!")
        .addField(
          "View profile in w3champions",
          `[Click here](https://www.w3champions.com/player/${battleTag})`
        );

      return message.channel.send({embeds: [newEmbed]});
    }

    embed.addField("Rank", stats.rankNumber, true);
    embed.addField("Mode", "1v1", true);
    embed.addField("League", leagueName, true);

    if (stats.player.race === 1) {
      race = "Human";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 2) {
      race = "Orc";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 4) {
      race = "Night";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 8) {
      race = "Undead";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    } else if (stats.race === 0) {
      race = "Random";
      embed.addFields(
        {
          name: race,
          value:
            stats.player.wins +
            " - " +
            stats.player.losses +
            "  (" +
            Math.round(stats.player.winrate * 100) +
            "%)",
          inline: true,
        },
        {
          name: "Mmr",
          value: stats.player.mmr,
          inline: true,
        },
        {
          name: "RP",
          value: Math.floor(stats.rankingPoints),
          inline: true,
        }
      );
    }

    embed
      .setColor("#0099ff")
      .setTitle(stats.player.name + " " + iconRace)
      .setThumbnail(image)
      .addField(
        "View profile in w3champions",
        `[Click here](https://www.w3champions.com/player/${battleTag})`
      );

    return message.channel.send({embeds: [embed]});
  } catch (error) {
    console.log(error);
    return message.channel.send(
      "This player has not played 1v1 games this season."
    );
  }
};

const matchEmbed = (player, message) => {
  let embed = new Discord.MessageEmbed();

  embed
    .setColor("#0099ff")
    .setTitle("Game")
    .setThumbnail("https://www.w3champions.com/img/grandmaster.9613f56f.png")
    .addFields(
      {
        name: "Match",
        value:
          player.teams[0].players[0].battleTag +
          "  VS  " +
          player.teams[1].players[0].battleTag,
      },
      { name: "Map", value: player.map }
    );
  message.channel.send({embeds: [embed]});
};

const rankingEmbed = (ranking, message, img) => {
  let embed = new Discord.MessageEmbed();
  let embed2 = new Discord.MessageEmbed();
  let embed3 = new Discord.MessageEmbed();
  let embed4 = new Discord.MessageEmbed();

  embed.setColor("#0099ff").setTitle("RANKING").setThumbnail(img);

  ranking.map((player, i) => {
    if (i < 25) {
      embed.addFields({
        name: player.player1Id,
        value: "Rank: " + player.rankNumber,
        inline: true,
      });
    } else {
      if (i < 50) {
        embed2.addFields({
          name: player.player1Id,
          value: "Rank: " + player.rankNumber,
          inline: true,
        });
      } else {
        if (i < 75) {
          embed3.addFields({
            name: player.player1Id,
            value: "Rank: " + player.rankNumber,
            inline: true,
          });
        } else {
          if (i < 100) {
            embed4.addFields({
              name: player.player1Id,
              value: "Rank: " + player.rankNumber,
              inline: true,
            });
          }
        }
      }
    }
  });

  if (embed.fields.length !== 0) {
    message.channel.send({embeds: [embed]});
  }
  if (embed2.fields.length !== 0) {
    embed2.setColor("#0099ff");
    message.channel.send({embeds: [embed2]});
  }
  if (embed3.fields.length !== 0) {
    embed3.setColor("#0099ff");
    message.channel.send({embeds: [embed3]});
  }
  if (embed4.fields.length !== 0) {
    embed4.setColor("#0099ff");
    message.channel.send({embeds: [embed4]});
  }
};

const matchesEmbed = (matchesList, message) => {
  let embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("MATCHES")
    .setThumbnail("https://www.w3champions.com/img/grandmaster.9613f56f.png");

  for (let i = 0; i < matchesList.matches.length; i++) {
    embed.addFields({
      name: "Match",
      value:
        matchesList.matches[i].teams[0].players[0].battleTag +
        " VS " +
        matchesList.matches[i].teams[1].players[0].battleTag,
    });
  }
  message.channel.send({embeds: [embed]});
};

const helpEmbed = (message) => {
  let embed = new Discord.MessageEmbed();
  embed.setColor("#0099ff").setTitle("Commands").addFields(
    {
      name: "!herolist",
      value: "Use this command first to discover how each hero should be written or abbreviated so the bot understands it.",
    },
    {
      name: "!profile [player]",
      value: "Print player profile.",
    },
    {
      name: "!mh [player]",
      value: "Print a list of the 24 most recent games in a player's match history including Match IDs.",
    },
    {
      name: "!score [player] vs [player]",
      value: "Print aggregated matches between two players. !detail [match ID] Print details about a match. Find match ID with !mh or on https://w3champions.com/",
    },
    {
      name: "!statshero [hero1] [hero2] [hero3] vs [hero1] [hero2] [hero3]",
      value: "Print winrates of specific hero matchups over all W3C games.",
    },
    {
      name: "!wr [map]",
      value: "Print winrates of all matchups on a specific map.",
    },
  );
  message.channel.send({embeds: [embed]});
};

module.exports = {
  playerEmbed,
  rankingEmbed,
  matchesEmbed,
  helpEmbed,
  matchEmbed,
  playerByName,
};
