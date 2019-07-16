function getMatchDetails(matchData) {
  const { competitors, scores, winner, actualStartDate } = matchData;

  const team1ID = competitors[0].id;
  const team2ID = competitors[1].id;

  const team1Score = scores[0].value;
  const team2Score = scores[1].value;

  const winnerID = winner.id;

  return {
    team1ID,
    team2ID,
    team1Score,
    team2Score,
    winnerID,
    matchDate: actualStartDate,
  };
}



module.exports = {
  getMatchDetails,
};
