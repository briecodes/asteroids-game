import React, { useState, useEffect, useReducer } from 'react';

import Asteroid from '../Asteroid/Asteroid';
import useInterval from '../../Hooks/useInterval';

export default function AsteroidField(props) {
  const randomInterval = Math.random() * 1000 + 1;
  const [asteroidCounter, setAsteroidCounter] = useState(0);
  const asteroidSpeed = Math.floor(Math.random() * (11 - props.stage) + (6 - props.stage));

  let [state, dispatch] = useReducer(
    (state, action) => {
      switch(action.type) {
        case 'ADD':
          return {
            ...state,
            roids: [...state.roids, <Asteroid key={asteroidCounter + 'a'} id={asteroidCounter + 'a'} removeAsteroid={removeRoid} scoreHandler={props.scoreHandler} speed={asteroidSpeed} />]
          };
        case 'REMOVE':
          return {
            ...state,
            roids: removeRoid()
          }
        case 'END':
          return {
            ...state,
            roids: []
          }
        default:
      };
    },
    {
      roids: []
    }
  );

  useEffect( () => {
    if (props.health < 10) props.endGame();

    const gameInterval = window.setInterval(() => {
      dispatch({type: 'ADD'});
      setAsteroidCounter(asteroidCounter + 1);
    }, randomInterval);

    return () => {
      clearInterval(gameInterval);
    };
  }, [props, randomInterval, asteroidCounter]);

  function removeRoid(id) {
    const item = state.roids.find(n => {return n.key === id} );
    const itemIndex = state.roids.indexOf(item);
    const tempArr = state.roids;

    return tempArr.splice(itemIndex, 1);
  };

  useInterval(() => {
    props.stageHandler();
  }, 10000);

  return(
    <React.Fragment>
      {state.roids}
    </React.Fragment>
  );
};