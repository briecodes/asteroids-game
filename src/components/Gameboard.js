import React, { useReducer } from 'react';

import Score from './Score';
import Health from './Health';
import AsteroidField from './AsteroidField';
import StartScreen from './StartScreen';
import EndScreen from './EndScreen';
import Nyah from '../assets/audio/mini-moose-nyah.mp3';

export default function Gameboard() {
  const nyah = new Audio(Nyah);

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

  return (
    <div className='asteroid-field'>
      <Score score={state.score} />
      
      <Health health={state.health} />

      {state.gameStage === 'START' ? <StartScreen startGame={() => dispatch({type: 'PLAY'})} /> : null }
      
      {state.gameStage === 'END' ? <EndScreen resetGame={() => dispatch({type: 'RESET'})} score={state.score} /> : null }
      
      {state.gameStage === 'PLAY' ? <AsteroidField setGame={() => dispatch({type: 'END'})} scoreHandler={dispatch} health={state.health} /> : null}

      <div className='mini-moose' onClick={() => nyah.play()}></div>
      <div className='planet'></div>
    </div>
  );
};