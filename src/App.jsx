// App.js - Main component
import React, { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import PauseScreen from './components/PauseScreen';
import { loadAssets } from './utils/assetLoader';
import useGameLoop from './hooks/useGameLoop';
import useGameState from './hooks/useGameState';

const App = () => {
  const {
    gameStarted,
    gameOver,
    score,
    lives,
    level,
    isPaused,
    setGameStarted,
    setGameOver,
    setScore,
    setLives,
    setLevel,
    setIsPaused
  } = useGameState();

  const [assets, setAssets] = useState({
    images: {
      ship: null,
      asteroid: null,
      background: null
    },
    sounds: {
      laser: null,
      explosion: null,
      thrust: null,
      gameOver: null,
      background: null
    }
  });

  // Load game assets
  useEffect(() => {
    loadAssets().then(loadedAssets => {
      setAssets(loadedAssets);
    });
  }, []);

  const { canvasRef } = useGameLoop({
    gameStarted,
    gameOver,
    level,
    isPaused,
    assets,
    setScore,
    setLives,
    setLevel,
    setGameOver
  });

  // Start new game
  const startGame = () => {
    setGameStarted(false);
    setTimeout(() => {
      setScore(0);
      setLives(3);
      setLevel(1);
      setGameOver(false);
      setGameStarted(true);
      setIsPaused(false);

      if (assets.sounds.background) {
        assets.sounds.background.play();
      }
    }, 1);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      {/* Game canvas */}
      <GameCanvas canvasRef={canvasRef} />

      {/* Start Screen */}
      {!gameStarted && <StartScreen onStartGame={startGame} />}

      {/* Game Over Screen */}
      {gameOver && <GameOverScreen score={score} level={level} onRestart={startGame} />}

      {/* Pause Screen */}
      {isPaused && <PauseScreen onResume={() => setIsPaused(false)} />}
    </div>
  );
};

export default App;

// components/GameCanvas.js

// components/StartScreen.js

// components/GameOverScreen.js
// components/PauseScreen.js

// hooks/useGameState.js

// hooks/useGameLoop.js


// utils/assetLoader.js