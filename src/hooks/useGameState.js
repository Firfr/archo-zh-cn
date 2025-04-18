
import { useState, useRef, useEffect } from 'react';

const useGameState = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs for game loop access
  const isPausedRef = useRef(isPaused);
  const livesRef = useRef(lives);
  const scoreRef = useRef(score);
  const levelRef = useRef(level);

  // Keep refs in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  return {
    gameStarted,
    gameOver,
    score,
    lives,
    level,
    isPaused,
    isPausedRef,
    livesRef,
    scoreRef,
    levelRef,
    setGameStarted,
    setGameOver,
    setScore,
    setLives,
    setLevel,
    setIsPaused
  };
};

export default useGameState;