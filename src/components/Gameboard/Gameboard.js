import React, { useReducer /*useEffect*/ } from 'react';

import './Gameboard.css';

import Score from '../Score/Score';
import Health from '../Health/Health';
import AsteroidField from '../AsteroidField/AsteroidField';
import StartScreen from '../Screens/StartScreen';
import EndScreen from '../Screens/EndScreen';
import Nyah from '../../assets/audio/mini-moose-nyah.mp3';

export default function Gameboard() {
  const nyah = new Audio(Nyah);

  let [state, dispatch] = useReducer(
    (state, action) => {
      switch(action.type) {
        case 'PLAY':
          return {
            ...state,
            status: 'PLAY'
          };
        case 'END':
          return {
            ...state,
            status: 'END'
          };
        case 'RESET':
          return {
            ...state,
            status: 'STANDBY',
            score: 0,
            health: 100,
            stage: 1
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
        case 'NEXT STAGE':
          return {
            ...state,
            stage: state.stage + 1
          }
        default: return state;
      };
    },
    {
      status: 'STANDBY',
      score: 0,
      health: 100,
      stage: 1
    }
  );

  return (
    <div className='asteroid-field'>
      <Score score={state.score} stage={state.stage} />
      
      <Health health={state.health} />

      {state.status === 'STANDBY' ? <StartScreen startGame={() => dispatch({type: 'PLAY'})} /> : null }
      
      {state.status === 'END' ? <EndScreen resetGame={() => dispatch({type: 'RESET'})} score={state.score} stage={state.stage} /> : null }
      
      {state.status === 'PLAY' ? <AsteroidField endGame={() => dispatch({type: 'END'})} scoreHandler={dispatch} health={state.health} stage={state.stage} stageHandler={() => dispatch({type: 'NEXT STAGE'})} /> : null}

      <div className='mini-moose' onClick={() => nyah.play()}></div>
      <div className='planet'></div>
    </div>
  );
};