
import React from 'react';

const PauseScreen = ({ onResume }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
      <h1 className="text-6xl mb-6 font-bold">PAUSED</h1>
      <p className="text-3xl mb-6">Game Paused</p>
      <button
        className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
        onClick={onResume}
      >
        RESUME
      </button>
    </div>
  );
};

export default PauseScreen;