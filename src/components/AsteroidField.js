import React, { useState, useEffect, useRef } from 'react';

import Asteroid from './Asteroid';

export default function AsteroidField(props) {
  const randomInterval = Math.random() * 1000 + 1;
  const [asteroidCounter, setAsteroidCounter] = useState(0);
  const [asteroidArray, setAsteroidArray] = useState([]);
  const currArr = useRef();
  const asteroidSpeed = Math.floor(Math.random() * 10 + 1);


  useEffect( () => {
    if (props.health < 10) props.setGame();
    currArr.current = asteroidArray;

    const gameInterval = window.setInterval(() => {
      addAsteroid();
    }, randomInterval);

    return () => {
      clearInterval(gameInterval);
    };
  });

  function addAsteroid() {
    setAsteroidArray([...asteroidArray, <Asteroid key={asteroidCounter + 'a'} id={asteroidCounter + 'a'} removeAsteroid={removeAsteroid} scoreHandler={props.scoreHandler} speed={asteroidSpeed} />]);
    setAsteroidCounter(asteroidCounter + 1);
  };

  function removeAsteroid(id) {
    const item = currArr.current.find(n => {return n.key === id} );
    const itemIndex = currArr.current.indexOf(item);
    currArr.current.splice(itemIndex, 1);
  };

  return(
    <React.Fragment>
      {asteroidArray}
    </React.Fragment>
  );
};