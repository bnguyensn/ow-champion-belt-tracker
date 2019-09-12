import React, { useEffect, useState } from 'react';
import fetchReport from '../../lib/fetchReport';
import teamIDToData from '../../data/teamIDToData.json';
import MatchDetails from '../MatchDetails';
import Spinner from '../Spinner';
import './home.css';

function Title({ championName, championLogoURL }) {
  return (
    <div className="title">
      <div className="title-text">
        <span>The current Overwatch champion belt holder is</span>
        <div className="title-text-champion-name">
          <span className="title-text-champion-name-side">🏆</span>
          <span className="title-text-champion-name-main">
            The {championName.toUpperCase()}
          </span>
          <span className="title-text-champion-name-side">🏆</span>
        </div>
      </div>
      <img
        className="title-logo"
        src={championLogoURL}
        alt={`${championName} logo`}
      />
    </div>
  );
}

function MatchHistory({ matchDetails, teamIDToData }) {
  // Loop through all champion-changing match details and generate React
  // components for each one.
  // Note that we are going through the match details array in reverse order.
  // This is because we want to display the latest match first.
  const matchDetailsComponents = [];
  let i = matchDetails.length - 1;
  while (i >= 0) {
    const {
      matchID,
      team1ID,
      team2ID,
      team1Score,
      team2Score,
      winnerID,
      matchDate: matchDateInt,
    } = matchDetails[i];

    const loserID = team1ID === winnerID ? team2ID : team1ID;
    const winnerScore = team1ID === winnerID ? team1Score : team2Score;
    const loserScore = team1ID === winnerID ? team2Score : team1Score;

    const matchD = new Date(matchDateInt);
    const matchDateStr = matchD
      .toLocaleString({
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .slice(0, 10);

    // Calculate the number of days the belt was held
    let beltHoldingDuration = 0;
    if (i > 0) {
      beltHoldingDuration = Math.floor(
        (matchDateInt - matchDetails[i - 1].matchDate) / (1000 * 60 * 60 * 24)
      );
    }

    matchDetailsComponents.push(
      <div key={matchID} className="match">
        <div className="match-title">{matchDateStr}</div>
        <MatchDetails
          winnerName={teamIDToData[winnerID].name}
          loserName={teamIDToData[loserID].name}
          winnerNameAbb={teamIDToData[winnerID].abbName}
          loserNameAbb={teamIDToData[loserID].abbName}
          winnerLogoURL={teamIDToData[winnerID].svgIcon}
          loserLogoURL={teamIDToData[loserID].svgIcon}
          winnerScore={winnerScore}
          loserScore={loserScore}
        />
        <div className="match-bottom-text">
          {`The ${teamIDToData[loserID].name} held the belt for ` +
            `${beltHoldingDuration} day` +
            `${beltHoldingDuration > 1 ? 's' : ''}.`}
        </div>
      </div>
    );

    i--;
  }

  return (
    <div className="match-history">
      <h2 className="match-history-title">CHAMPION BELT HISTORY</h2>
      <div className="separator" />
      <div className="match-history-list">{matchDetailsComponents}</div>
    </div>
  );
}

export default function Home({ championReport, setChampionReport }) {
  const [isLoading, setIsLoading] = useState(false);
  const [championName, setChampionName] = useState('');
  const [championLogoURL, setChampionLogoURL] = useState('');
  const [matchDetails, setMatchDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!championReport) {
      getChampionReport();
    } else {
      displayChampionReport();
    }
  }, [championReport]);

  const getChampionReport = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const report = await fetchReport();

      setChampionReport(report);
    } catch (err) {
      setErrorMsg(err.message);
    }

    setIsLoading(false);
  };

  const displayChampionReport = () => {
    const { stageChampionIDs, championChangingMatchDetails } = championReport;
    const latestChampionID = stageChampionIDs[stageChampionIDs.length - 1];

    setChampionName(teamIDToData[latestChampionID].name);
    setChampionLogoURL(teamIDToData[latestChampionID].svgIcon);

    setMatchDetails(championChangingMatchDetails);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="home">
      <div className="title-container">
        <Title championName={championName} championLogoURL={championLogoURL} />
      </div>
      <div className="match-history-container">
        <MatchHistory matchDetails={matchDetails} teamIDToData={teamIDToData} />
      </div>
    </div>
  );
}
