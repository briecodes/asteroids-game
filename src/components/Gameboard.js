import React, { useContext, useState, useRef, useEffect } from 'react';
import AppContext from '../AppContext';

import Score from './Score';
import Health from './Health';
import AsteroidField from './AsteroidField';
import Nyah from '../assets/audio/mini-moose-nyah.mp3';

export default function Gameboard() {
  const nyah = new Audio(Nyah);
  const context = useContext(AppContext);
  const [score, setScore] = useState(0);
  const [game, setGame] = useState(false);
  const currScore = useRef();

  useEffect(() => {
    currScore.current = score;
  });

  function startGame() {
    setGame(true);
    context.gameStage = 'play';
  };

  function endGame() {
    setGame(false);
    context.gameStage = 'end';
  };

  function resetGame() {
    context.health = 100;
    setScore(0);
    currScore.current = score;
    setGame(true);
    context.gameStage = 'play';
  }

  function scoring(n) {
    setScore(currScore.current + n);
    currScore.current = score;
  };

  return (
    <div className='asteroid-field'>
      <Score score={score} />
      
      <Health />

      {context.gameStage === 'start' ? <button className='start' onClick={startGame}>Start Game</button> : null }
      
      {context.gameStage === 'end' ? <button className='start' onClick={resetGame}>Final score: {currScore.current}<br />Start another game?</button> : null }
      
      {game ? <AsteroidField setGame={endGame} game={game} scoreHandler={scoring} /> : null}

      <div className='mini-moose' onClick={() => nyah.play()}></div>
      <div className='planet'></div>
    </div>
  );
};