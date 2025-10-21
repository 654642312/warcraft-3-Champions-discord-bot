async function getProfilePicture(battleTag) {
  const tag = battleTag.replace(/#/gi, "%23");

  const response = await fetch(
    `https://statistic-service.w3champions.com/api/personal-settings/${tag}`
  );

  const personalSettings = await response.json();

  let image = '';

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
  return image
}
