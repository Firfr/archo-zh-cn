import React, { useEffect, useState, useRef } from 'react';

function App() {
    // Game state
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    
  return (
    <>
<div className="w-full h-screen bg-black overflow-hidden relative">
   
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
          <h1 className="text-6xl mb-6 font-bold">ASTEROIDS</h1>
          <div className="mb-8 text-center max-w-md">
            <p className="mb-4">Use WASD or arrow keys to control your ship.</p>
            <p className="mb-4">Spacebar to shoot. Destroy all asteroids to advance to the next level.</p>
            <p>Watch out! If your ship gets hit, you'll lose a life!</p>
          </div>
          <button
            className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
            onClick={startGame}
          >
            START GAME
          </button>
        </div>
    </div>
    </>
  )
}

export default App
