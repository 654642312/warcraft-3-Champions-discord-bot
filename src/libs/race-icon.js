const emojiUnd = "<:Undead:771391362595160084>";
const emojiOrc = "<:ORC:771391078833061948>";
const emojiNe = "<:NE:771390761052012645>";
const emojiHum = "<:Hum:771391612663496725>";
const emojiRdm = "<:RDM:771392710522437653>";

export function raceIcon(race) {
  if (race === 1) {
    iconRace = emojiHum;
  } else if (race === 2) {
    iconRace = emojiOrc;
  } else if (race === 4) {
    iconRace = emojiNe;
  } else if (race === 8) {
    iconRace = emojiUnd;
  } else if (race === 0) {
    iconRace = emojiRdm;
  }
  return iconRace
}
