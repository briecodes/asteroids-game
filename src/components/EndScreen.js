import React from 'react';

export default function EndScreen(props) {
  return (
    <div className='interim-module-container'>
      <div className='interim-module'>
        <h1>
          Final score: {props.score}
        </h1>
        <button className='start' onClick={props.resetGame}>Start another game</button>
      </div>
    </div>
  );
};