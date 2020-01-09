import React, { useState, useRef, useEffect } from 'react';

import Asteroid from './Asteroid';
import Score from './Score';

import Nyah from '../assets/audio/mini-moose-nyah.mp3';

export default function AsteroidField() {
  const domScore = useRef();
  const domHealth = useRef();
  const nyah = new Audio(Nyah);
  const randomInterval = Math.random() * 1000 + 1;
  const [score, setScore] = useState(0);
  const [asteroidCounter, setAsteroidCounter] = useState(0);
  const [asteroidArray, setAsteroidArray] = useState([]);
  const [gameStage, setGameStage] = useState('start');
  const [health, setHealth] = useState(100);
  let gameInterval;

  useEffect( () => {
    if (gameStage === 'gameplay') startGame();

    return () => {
      clearInterval(gameInterval);
    };
  });

  function startGame() {
    setGameStage('gameplay');
    
    gameInterval = window.setInterval(() => {
      addAsteroid();
    }, randomInterval);
  };

  function addAsteroid() {
    setAsteroidArray([...asteroidArray, <Asteroid key={asteroidCounter + 'a'} id={asteroidCounter + 'a'} scoreHandler={scoreHandler} />]);
    setAsteroidCounter(asteroidCounter + 1);
  };

  function removeAsteroid(id) {
    // console.log('asteroid ID: ', id.current);
    // console.log('asteroidArray', asteroidArray);
  };

  function scoreHandler(n, id) {
    removeAsteroid(id);
    setScore(parseInt(domScore.current.textContent) + n);
    if (n < 0) setHealth(parseInt(domHealth.current.style.width) - 10);
    if ((parseInt(domHealth.current.style.width) - 10) < 0) {
      setGameStage('end');
      clearInterval(gameInterval);
    };
  };

  return(
    <div className='asteroid-field'>
      <Score score={score} domScore={domScore} />
      <div className='health-container'>
        <div className='energia' ref={domHealth} style={{width: `${health}%`}}></div>
      </div>

      {gameStage === 'start' ? <button className='start' onClick={startGame}>Start Game</button> : null }

      {asteroidArray}
      
      <div className='mini-moose' onClick={() => nyah.play()}></div>
      <div className='planet'></div>
    </div>
  );
};