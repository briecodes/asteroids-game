import React from 'react';

import './Score.css';

export default function Counter(props) {
  return (
    <div className='score-counter'>
      Stage: {props.stage} <br />
      Score: {props.score}
    </div>
  );
};