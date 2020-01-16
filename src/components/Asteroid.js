import React, { useEffect, useCallback, useRef } from 'react';

export default function Asteroid(props) {
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
    props.scoreHandler({type: 'ARMAGEDDON'});
    splodeIt();
  }, [splodeIt, props]);

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
    props.scoreHandler({type: 'HIT'});
    splodeIt();
  };

  return (
    <div className='asteroid-container' onClick={directHit} id={props.id} ref={asteroidContainer} style={{left: xAxis, animation: `asteroid-trajectory 1 ${props.speed}s linear forwards`}} >
      <div className={`asteroid a${aNum.toFixed(0)}`} ref={asteroid}></div>
    </div>
  );
};