// utils/assetLoader.js (continued)
export const loadAssets = async () => {
    return new Promise(resolve => {
      const shipImg = new Image();
      shipImg.src = '/ship.png';
      
      const asteroidImg = new Image();
      asteroidImg.src = '/ast.png';
      
      const backgroundImg = new Image();
      backgroundImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><rect width="2" height="2" fill="%23111"/></svg>';
      
      const images = {
        ship: null,
        asteroid: null,
        background: null
      };
      
      let imagesLoaded = 0;
      const totalImages = 3;
      
      const checkAllLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded >= totalImages) {
          resolve({
            images,
            sounds
          });
        }
      };
      
      shipImg.onload = () => {
        images.ship = shipImg;
        checkAllLoaded();
      };
      
      asteroidImg.onload = () => {
        images.asteroid = asteroidImg;
        checkAllLoaded();
      };
      
      backgroundImg.onload = () => {
        images.background = backgroundImg;
        checkAllLoaded();
      };
      
      const laserSound = new Audio("laser.mp3");
      const explosionSound = new Audio("explosion.mp3");
      const thrustSound = new Audio("thrust.mp3");
      const gameOverSound = new Audio("gameOver.mp3");
      const backgroundMusic = new Audio("bgm.mp3");
      
      backgroundMusic.loop = true;
      
      const sounds = {
        laser: { play: () => laserSound.play() },
        explosion: { play: () => explosionSound.play() },
        thrust: { 
          play: () => thrustSound.play(), 
          pause: () => thrustSound.pause() 
        },
        gameOver: { play: () => gameOverSound.play() },
        background: { 
          play: () => backgroundMusic.play(), 
          pause: () => backgroundMusic.pause() 
        }
      };
    });
  };
  
  // utils/asteroidUtils.js
 
  
  // utils/explosionUtils.js
