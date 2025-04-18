export const createAsteroids = (level, canvasRef, shipRef, asteroidsRef, generateAsteroidPoints) => {
    const canvas = canvasRef.current;
    const numAsteroids = level * 2 + 3; // More asteroids each level

    const newAsteroids = [];
    for (let i = 0; i < numAsteroids; i++) {
        // Create asteroids away from the ship
        let x, y;
        do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        } while (
            Math.sqrt(
                Math.pow(x - shipRef.current.x, 2) +
                Math.pow(y - shipRef.current.y, 2)
            ) < 200
        );

        const size = Math.random() * 30 + 40; // 40-70 pixel asteroids
        const speed = Math.random() * (0.5 + level * 0.1) + 0.5; // Faster with each level
        const angle = Math.random() * Math.PI * 2;

        newAsteroids.push({
            x,
            y,
            size,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            points: generateAsteroidPoints(size),
            type: 'large'
        });
    }

    asteroidsRef.current = newAsteroids;
};

export const generateAsteroidPoints = (size) => {
    const numPoints = Math.floor(Math.random() * 5) + 8; // 8-12 points
    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variation = (Math.random() * 0.3 + 0.8) * size / 2; // 80-110% of radius
        const x = Math.cos(angle) * variation;
        const y = Math.sin(angle) * variation;
        points.push({ x, y });
    }

    return points;
};