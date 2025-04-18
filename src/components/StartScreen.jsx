
import React from 'react';

const StartScreen = ({ onStartGame }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
      <h1 className="text-6xl mb-6 font-bold">ARCHO</h1>
      <div className="mb-8 text-center max-w-md">
        <p className="mb-4">Use WASD or arrow keys to control your ship.</p>
        <p className="mb-4">Spacebar to shoot. Destroy all asteroids to advance to the next level.</p>
        <p>Watch out! If your ship gets hit, you'll lose a life!</p>
      </div>
      <button
        className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
        onClick={onStartGame}
      >
        START GAME
      </button>
    </div>
  );
};

export default StartScreen;