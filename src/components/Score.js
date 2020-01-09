import React from 'react';

export default function Counter(props) {
  return (
    <div className='score-counter'>
      Score: <span ref={props.domScore}>{props.score}</span>
    </div>
  )
};