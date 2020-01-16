import React, { useContext, useState, useRef, useEffect, useReducer } from 'react';
import AppContext from '../AppContext';

import Score from './Score';
import Health from './Health';
import AsteroidField from './AsteroidField';
import StartScreen from './StartScreen';
import EndScreen from './EndScreen';
import Nyah from '../assets/audio/mini-moose-nyah.mp3';

export default function Gameboard() {
  const nyah = new Audio(Nyah);
  const context = useContext(AppContext);
  const [score, setScore] = useState(0);
  const [game, setGame] = useState(false);
  const currScore = useRef();

  let [state, dispatch] = useReducer(
    (state, action) => {
      switch(action.type) {
        case 'PLAY':
          return {
            ...state,
            gameStage: 'PLAY'
          };
        case 'END':
          return {
            ...state,
            gameStage: 'END'
          };
        case 'RESET':
          return {
            ...state,
            gameStage: 'START',
            score: 0,
            health: 100
          };
        case 'HIT':
          return {
            ...state,
            score: state.score + 5
          };
        case 'ARMAGEDDON':
          return {
            ...state,
            score: state.score - 10,
            health: state.health - 10
          };
        default: return state;
      };
    },
    {
      gameStage: 'START',
      score: 0,
      health: 100
    }
  );


  // useEffect(() => {
  //   currScore.current = score;
  // });

  function startGame() {
    dispatch({type: 'PLAY'});
    // setGame(true);
    // context.gameStage = 'play';
  };

  function endGame() {
    dispatch({type: 'END'});
    // setGame(false);
    // context.gameStage = 'end';
  };

  function resetGame() {
    dispatch({type: 'RESET'})
    // context.health = 100;
    // setScore(0);
    // currScore.current = score;
    // setGame(true);
    // context.gameStage = 'play';
  };

  function scoring(n) {
    dispatch({type: 'HIT'});
    // setScore(currScore.current + n);
    // currScore.current = score;
  };

  return (
    <div className='asteroid-field'>
      <Score score={state.score} />
      
      <Health health={state.health} />

      {state.gameStage === 'START' ? <StartScreen startGame={startGame} /> : null }
      
      {state.gameStage === 'END' ? <EndScreen resetGame={resetGame} score={state.score} /> : null }
      
      {state.gameStage === 'PLAY' ? <AsteroidField setGame={endGame} scoreHandler={dispatch} health={state.health} /> : null}

      <div className='mini-moose' onClick={() => nyah.play()}></div>
      <div className='planet'></div>
    </div>
  );
};