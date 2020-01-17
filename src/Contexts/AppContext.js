import React from 'react';

const AppContext = React.createContext({score: 0, health: 100, gameStage: 'start'});
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export const AppGame = AppContext.Game;

export default AppContext;