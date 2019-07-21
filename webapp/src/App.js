import React, { useEffect, useState } from 'react';
import Error from './components/Error';
import Spinner from './components/Spinner';
import fetchReport from './lib/fetchReport';
import teamIDToData from './data/teamIDToData.json';
import MatchDetails from './components/MatchDetails';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [championName, setChampionName] = useState('');
  const [championLogoURL, setChampionLogoURL] = useState('');
  const [matchDetails, setMatchDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getChampionReport();
  }, []);

  const getChampionReport = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const report = await fetchReport();

      setChampionName(teamIDToData[report.latestChampionID].name);
      setChampionLogoURL(teamIDToData[report.latestChampionID].svgIcon);

      setMatchDetails(report.championChangingMatchDetails);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setIsLoading(false);
  };

  const matchDetailsComponents = [];
  let i = matchDetails.length - 1;
  while (i >= 0) {
    const {
      team1ID,
      team2ID,
      team1Score,
      team2Score,
      winnerID,
      matchDate,
    } = matchDetails[i];

    const loserID = team1ID === winnerID ? team2ID : team1ID;
    const winnerScore = team1ID === winnerID ? team1Score : team2Score;
    const loserScore = team1ID === winnerID ? team2Score : team1Score;

    const matchDateStr = new Date(matchDate).toLocaleString('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).slice(0, 10);

    matchDetailsComponents.push(
      <div className="match">
        <div className="match-title">
          {matchDateStr}
        </div>
        <MatchDetails
          key={matchDate}
          winnerName={teamIDToData[winnerID].name}
          loserName={teamIDToData[loserID].name}
          winnerNameAbb={teamIDToData[winnerID].abbName}
          loserNameAbb={teamIDToData[loserID].abbName}
          winnerLogoURL={teamIDToData[winnerID].svgIcon}
          loserLogoURL={teamIDToData[loserID].svgIcon}
          winnerScore={winnerScore}
          loserScore={loserScore}
        />
      </div>
    );

    i--;
  }

  return (
    <div className="app">
      {isLoading ? (
        <Spinner />
      ) : errorMsg ? (
        <Error errMsg={errorMsg} />
      ) : (
        <>
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
          <br />
          <br />
          <div className="match-history">
            <h2 className="match-history-title">
              Champion Belt History
            </h2>
            <div className="separator" />
            <div className="match-history-list">{matchDetailsComponents}</div>
          </div>
        </>
      )}
    </div>
  );
}
