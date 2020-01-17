import React from 'react';

import './Score.css';

export default function Counter(props) {
  return (
    <div className='score-counter'>
      Score: {props.score}
    </div>
  )
};