import React from 'react';

export default function Counter(props) {
  return (
    <div className='score-counter'>
      Score: {props.score}
    </div>
  )
};