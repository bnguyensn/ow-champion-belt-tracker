import React, { useEffect, useState } from 'react';
import Error from './components/Error';
import Spinner from './components/Spinner';
import fetchData from './lib/fetchData';
import teamIDToData from './data/teamIDToData.json';
import MatchDetails from './components/MatchDetails';
import TeamDisplay from './components/TeamDisplay';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [championName, setChampionName] = useState('');
  const [championLogoURL, setChampionLogoURL] = useState('');
  const [matchDetails, setMatchDetails] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetchData();

      setChampionName(teamIDToData[res.latestChampionID].name);
      setChampionLogoURL(teamIDToData[res.latestChampionID].svgIcon);

      setMatchDetails(res.championChangingMatchDetails);
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
    
    matchDetailsComponents.push(
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
          <div className="match-history">{matchDetailsComponents}</div>
        </>
      )}
    </div>
  );
}
