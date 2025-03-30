import React, { useEffect, useState, useRef } from 'react';

function App() {
    // Game state
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [level, setLevel] = useState(1);
    
    // Refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(0);
  
  // Game objects
  const shipRef = useRef({
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    speed: 5,
    rotation: 0,
    dx: 0,
    dy: 0,
    thrust: 0.1,
    maxSpeed: 7,
    friction: 0.98,
    invulnerable: false,
    invulnerableTime: 0
  });
  
  const lasersRef = useRef([]);
  const asteroidsRef = useRef([]);
  const explosionsRef = useRef([]);
  const starsRef = useRef([]);
  const keysRef = useRef({});
  
  // Images
  const [images, setImages] = useState({
    ship: null,
    asteroid: null,
    background: null
  });
  
  // Audio
  const [sounds, setSounds] = useState({
    laser: null,
    explosion: null,
    thrust: null,
    gameOver: null,
    background: null
  });
  
  // Preload assets
  useEffect(() => {
    const shipImg = new Image();
    shipImg.src = '/ship.png';
    
    const asteroidImg = new Image();
    asteroidImg.src = '/ast.png';
    
    const backgroundImg = new Image();
    backgroundImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><rect width="2" height="2" fill="%23111"/></svg>';
    
    shipImg.onload = () => {
      setImages(prev => ({...prev, ship: shipImg}));
    };
    
    asteroidImg.onload = () => {
      setImages(prev => ({...prev, asteroid: asteroidImg}));
    };
    
    backgroundImg.onload = () => {
      setImages(prev => ({...prev, background: backgroundImg}));
    };
    
    // For a real game, you'd load actual audio files
    const laserSound = { play: () => {laser.mp3} };
    const explosionSound = { play: () => {elpl.mp3} };
    const thrustSound = { play: () => {thrust.mp3}, pause: () => {} };
    const gameOverSound = { play: () => {gameOver.mp3} };
    const backgroundMusic = { play: () => {bgm.mp3}, pause: () => {} };
    
    setSounds({
      laser: laserSound,
      explosion: explosionSound,
      thrust: thrustSound,
      gameOver: gameOverSound,
      background: backgroundMusic
    });
    
    // Generate stars for background
    const newStars = [];
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    starsRef.current = newStars;
    
  }, []);

  // Initialize game
  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    
    // Reset game state
    const ship = shipRef.current;
    ship.x = canvas.width / 2;
    ship.y = canvas.height / 2;
    ship.dx = 0;
    ship.dy = 0;
    ship.rotation = 0;
    ship.invulnerable = false;
    
    lasersRef.current = [];
    asteroidsRef.current = [];
    explosionsRef.current = [];
    
    // Create initial asteroids
    createAsteroids(level);
    
    // Start game loop
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameStarted, level]);
    
  // Handle keyboard input
  useEffect(() => {
    if (!gameStarted) return;
    
    const handleKeyDown = (e) => {
      keysRef.current[e.key] = true;
      
      // Fire laser on spacebar
      if (e.key === ' ' && !gameOver) {
        fireLaser();
      }
    };
    
    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
      
      // Stop thrust sound when releasing thrust key
      if ((e.key === 'ArrowUp' || e.key === 'w') && sounds.thrust) {
        sounds.thrust.pause();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, gameOver, sounds]);
  
  // Fire laser from ship
  const fireLaser = () => {
    const ship = shipRef.current;
    
    // Calculate laser starting position at ship's nose
    const angle = ship.rotation;
    const offsetX = Math.sin(angle) * ship.width/2;
    const offsetY = -Math.cos(angle) * ship.height/2;
    
    lasersRef.current.push({
      x: ship.x + offsetX,
      y: ship.y + offsetY,
      dx: Math.sin(angle) * 10,
      dy: -Math.cos(angle) * 10,
      size: 3,
      life: 50 // Laser lifetime in frames
    });
    
    // Play laser sound
    if (sounds.laser) {
      sounds.laser.play();
    }
  };
  
  // Split asteroid into smaller pieces
  const splitAsteroid = (asteroid, index) => {
    const asteroids = asteroidsRef.current;
    
    // Remove original asteroid
    asteroids.splice(index, 1);
    
    // Play explosion sound
    if (sounds.explosion) {
      sounds.explosion.play();
    }
    
    // Create explosion effect
    explosionsRef.current.push({
      x: asteroid.x,
      y: asteroid.y,
      size: asteroid.size,
      life: 20, // Duration of explosion
      particles: createExplosionParticles(asteroid)
    });
    
    // Split into smaller asteroids if large enough
    if (asteroid.size > 25) {
      const numPieces = Math.floor(Math.random() * 2) + 2; // 2-3 pieces
      
      for (let i = 0; i < numPieces; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        
        asteroids.push({
          x: asteroid.x,
          y: asteroid.y,
          size: asteroid.size / 2,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          points: generateAsteroidPoints(asteroid.size / 2),
          type: 'small'
        });
      }
    }
    
    // Increase score based on asteroid size
    setScore(prev => prev + Math.floor(asteroid.size));
    
    // Check if all asteroids are destroyed
    if (asteroids.length === 0) {
      // Move to next level
      setLevel(prev => prev + 1);
    }
  };
  
  // Create explosion particles
  const createExplosionParticles = (asteroid) => {
    const particles = [];
    const numParticles = Math.floor(asteroid.size / 2);
    
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      
      particles.push({
        x: 0,
        y: 0,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        life: Math.random() * 30 + 10
      });
    }
    
    return particles;
  };
  
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
