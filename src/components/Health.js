import React, { useContext } from 'react';
import AppContext from '../AppContext';

export default function Health(props) {
  const context = useContext(AppContext);
  
  return (
    <div className='health-container'>
      <div className='energia' style={{width: `${props.health}%`}}></div>
    </div>
  );
};