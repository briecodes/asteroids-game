import React, { useState } from 'react';
import './App.css';

import AsteroidField from './components/AsteroidField';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
        <AsteroidField counter={counter} setCounter={setCounter} />
    </div>
  );
};

export default App;
