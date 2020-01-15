import React, { useEffect, useCallback, useContext, useRef } from 'react';
import AppContext from '../AppContext';

export default function Asteroid(props) {
  const context = useContext(AppContext);
  const asteroidContainer = useRef();
  const asteroid = useRef();
  const xAxis = (Math.random() * 90 + 1) + '%';
  const aNum = Math.random() * 3;
  let armageddonTimeout = useRef();

  const splodeIt = useCallback(() => {
    asteroidContainer.current.style.animationPlayState = 'paused';
    asteroid.current.classList.add('splody');

    window.setTimeout(() => {
      props.removeAsteroid(props.id);
    }, 250);

  }, [props]);

  const suddenImpact = useCallback( () => {
    context.health = context.health - 10;
    props.scoreHandler(-10);
    splodeIt();
  }, [context, splodeIt, props]);

  useEffect(() => {
    armageddonTimeout.current = window.setTimeout( () => {
      suddenImpact();
    }, props.speed * 1000);

    return () => {
      clearTimeout(armageddonTimeout.current);
    };
  }, [suddenImpact, props]);

  function directHit() {
    clearInterval(armageddonTimeout.current);
    props.scoreHandler(5);
    splodeIt();
  };

  return (
    <div className='asteroid-container' onClick={directHit} id={props.id} ref={asteroidContainer} style={{left: xAxis, animation: `asteroid-trajectory 1 ${props.speed}s linear forwards`}} >
      <div className={`asteroid a${aNum.toFixed(0)}`} ref={asteroid}></div>
    </div>
  );
};