
import React from 'react';

const GameCanvas = ({ canvasRef }) => {
  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full absolute top-0 left-0"
    />
  );
};

export default GameCanvas;
