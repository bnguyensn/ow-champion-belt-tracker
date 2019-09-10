import React from 'react';
import './about.css';

export default function About() {
  return (
    <div className="about">
      <div className="about-content-container">
        <div>
          This is a <a href="https://reactjs.org/">React</a> application. It
          uses data from Blizzard's{' '}
          <a href="https://overwatchleague.com/">Overwatch League</a> API.
        </div>
        <div>
          Source code is public on{' '}
          <a href="https://github.com/bnguyensn/ow-champion-belt-tracker">
            GitHub
          </a>
          .
        </div>
        <div>
          Made with 💖 by <a href="https://twitter.com/bnguyensn">@bnguyensn</a>
          .
        </div>
      </div>
    </div>
  );
}
