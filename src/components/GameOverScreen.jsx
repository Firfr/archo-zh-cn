
import React from 'react';

const GameOverScreen = ({ score, level, onRestart }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
      <h1 className="text-6xl mb-6 font-bold text-red-500">GAME OVER</h1>
      <p className="text-3xl mb-6">Final Score: {score}</p>
      <p className="text-xl mb-8">You reached level {level}</p>
      <button
        className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
        onClick={onRestart}
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOverScreen;
