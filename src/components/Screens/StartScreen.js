import React from 'react';

import './Screens.css';

export default function StartScreen(props) {
  return (
    <div className='interim-module-container'>
      <div className='interim-module'>
        <h1>Save Mini-Moose!</h1>
        <p>
          Click to destory the asteroids before <br />
          they crash into your most precious and dear friend!
        </p>
        <button className='start' onClick={props.startGame}>Start Game</button>
      </div>
    </div>
  );
};