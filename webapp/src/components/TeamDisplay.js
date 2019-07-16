import React from 'react';

export default function TeamDisplay({
  teamName,
  teamNameAbb,
  teamLogoURL,
  displaySide,
  isWinner,
}) {
  return (
    <div
      className="team-display"
      style={{ flexDirection: displaySide === 'right' ? 'row-reverse' : 'row' }}
    >
      <div
        className={`team-display-name ${isWinner && 'team-display-name-winner'}`}
      >
        {teamName}
      </div>
      <div
        className={`team-display-name-abb ${isWinner && 'team-display-name-winner'}`}
      >
        {teamNameAbb}
      </div>
      <img
        className="team-display-logo"
        src={teamLogoURL}
        alt={`${teamName} logo`}
      />
    </div>
  );
}
