import React from 'react';
import ChessBoard from './components/ChessBoard';
import Timer from './components/Timer';

const App: React.FC = () => {
  return (
    <div>
      <h1>Chess Game</h1>
      <Timer />
      <ChessBoard />
    </div>
  );
};

export default App;