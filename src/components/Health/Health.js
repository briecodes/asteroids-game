import React from 'react';

import './Health.css';

export default function Health(props) {
  
  return (
    <div className='health-container'>
      <div className='energia' style={{width: `${props.health}%`}}></div>
    </div>
  );
};