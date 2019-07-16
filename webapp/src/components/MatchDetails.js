import React from 'react';
import TeamDisplay from './TeamDisplay';

export default function MatchDetails({
  winnerName,
  winnerNameAbb,
  winnerLogoURL,
  loserName,
  loserNameAbb,
  loserLogoURL,
  winnerScore,
  loserScore,
}) {
  return (
    <div className="match-details">
      <TeamDisplay
        teamName={winnerName}
        teamNameAbb={winnerNameAbb}
        teamLogoURL={winnerLogoURL}
        displaySide="left"
        isWinner
      />
      <div className="match-details-score">
        <span className="match-details-score-winner">{winnerScore}</span>
        <span style={{ margin: '0 0.5rem' }}>-</span>
        <span>
          {loserScore}
        </span>
      </div>
      <TeamDisplay
        teamName={loserName}
        teamNameAbb={loserNameAbb}
        teamLogoURL={loserLogoURL}
        displaySide="right"
      />
    </div>
  );
}
