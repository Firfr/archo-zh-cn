export const createExplosionParticles = (asteroid) => {
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