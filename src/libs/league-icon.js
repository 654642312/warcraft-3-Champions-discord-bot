const emojiGrandMaster = "<:GM:762322281371664385>";
const emojiMaster = "<:master:762322420253065216>";
const emojiDiamond = "<:Diamond:762323081041149982>";
const emojiPlatinum = "<:platinum:762322351161212969>";
const emojiGold = "<:gold:762322312321826848>";
const emojiSilver = "<:silver:762322243434053653>";
const emojiBronze = "<:Bronze:762322183589855295>";
const emojiAdept = "<:Adept:1036063381750284290>";

export function leagueIcon() {
  if (leagueName === "Grand Master") {
    return emojiGrandMaster;
  }
  if (leagueName === "Master") {
    return emojiMaster;
  }

  if (leagueName === "Adept") {
    return emojiAdept;
  }

  if (leagueName === "Diamond") {
    return emojiDiamond;
  }

  if (leagueName === "Platinum") {
    return emojiPlatinum;
  }

  if (leagueName === "Gold") {
    return emojiGold;
  }

  if (leagueName === "Silver") {
    return emojiSilver;
  }

  if (leagueName === "Bronze") {
    return emojiBronze;
  }
}
