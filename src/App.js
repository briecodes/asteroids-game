import React, { useState } from 'react';
import './App.css';

import Gameboard from './components/Gameboard';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
        <Gameboard counter={counter} setCounter={setCounter} />
    </div>
  );
};

export default App;
