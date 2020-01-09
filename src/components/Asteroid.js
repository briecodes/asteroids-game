import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function Asteroid(props) {
  const [splode, setSplode] = useState('');
  const xAxis = (Math.random() * 90 + 1) + '%'
  const aNum = Math.random() * 3;
  const ast = useRef();
  let issaHit;

  const suddenImpact = useCallback( () => {
    props.scoreHandler(-10, props.id);
    splodeIt();
  }, [props]);

  useEffect(() => {
    issaHit = window.setTimeout( () => {
      suddenImpact();
    }, 9500);

    return () => {
      console.log('BYE. ', props.id);
    };
  }, [suddenImpact]);

  function directHit() {
    props.scoreHandler(5, ast);
    clearInterval(issaHit);
    splodeIt();
  };

  function splodeIt() {
    setSplode('splody');

    window.setTimeout(() => {
      ast.current.remove();
    }, 125);
  };

  return (
    <div className='asteroid-container' onClick={directHit} ref={ast} id={props.id} style={{left: xAxis}} >
      <div className={`asteroid a${aNum.toFixed(0)} ${splode}`}></div>
    </div>
  );
};