import React from 'react';

import './Screens.css';

export default function EndScreen(props) {
  return (
    <div className='interim-module-container'>
      <div className='interim-module'>
        <h3>
          You made it to Stage {props.stage}!
        </h3>
        <h1>
          Final score: {props.score}
        </h1>
        <button className='start' onClick={props.resetGame}>Start another game</button>
      </div>
    </div>
  );
};