/**
 * Return the current holder of the OVERWATCH CHAMPION title
 * */

const chalk = require('chalk');
const { getTeamNameFromID } = require('./parseTeamData');
const { getMatchDetails } = require('./parseMatchData');

function getCurrentChampionIDFromStagesData(stages) {
  // Get a champion at the end of each stage (there are 5 stages)
  const currentChampionIDs = [4410, 0, 0, 0, 0];
  const championChangingMatchDetails = [];

  // Go through each stage
  console.log('Going through each stage...');
  for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
    const matches = stages[stageIndex].matches;

    // Go through each match in a stage
    console.log('Going through each match in a stage...');
    console.log(`Checking stage #${stageIndex}`);
    if (matches.length > 0) {
      for (let matchIndex = 0; matchIndex < matches.length; matchIndex++) {
        // console.log(`Checking match ${matchIndex} of stage ${stageIndex}`);

        const { competitors, winner } = matches[matchIndex];
        const team1ID = competitors[0].id;
        const team2ID = competitors[1].id;

        if (
          winner &&
          (team1ID === currentChampionIDs[stageIndex] ||
            team2ID === currentChampionIDs[stageIndex])
        ) {
          // This match includes the current champion
          // Update the current title holder, if applicable
          if (winner.id !== currentChampionIDs[stageIndex]) {
            const team1Name = getTeamNameFromID(team1ID);
            const team2Name = getTeamNameFromID(team2ID);
            const winnerName = getTeamNameFromID(winner.id);

            console.log(
              chalk.cyanBright(
                `${winnerName} took the CHAMPION title from ${
                  winner.id === team1ID ? team2Name : team1Name
                }!`
              )
            );

            currentChampionIDs[stageIndex] = winner.id;
            championChangingMatchDetails.push(
              getMatchDetails(matches[matchIndex])
            );
          }
        }
      }
    }

    // The "current" champion of the next stage is the champion of this stage
    if (stageIndex < currentChampionIDs.length - 1) {
      currentChampionIDs[stageIndex + 1] = currentChampionIDs[stageIndex];
    }
  }

  return {
    currentChampionIDs,
    championChangingMatchDetails,
  };
}

module.exports = {
  getCurrentChampionIDFromStagesData,
};
