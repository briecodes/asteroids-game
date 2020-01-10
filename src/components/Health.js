import React, { useContext } from 'react';
import AppContext from '../AppContext';

export default function Health() {
  const context = useContext(AppContext);
  
  return (
    <div className='health-container'>
      <div className='energia' style={{width: `${context.health}%`}}></div>
    </div>
  );
};