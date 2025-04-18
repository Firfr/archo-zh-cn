
import React from 'react';

const StartScreen = ({ onStartGame }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white">
      <h1 className="text-6xl mb-6 font-bold">ARCHO-行星射手</h1>
      <div className="mb-8 text-center max-w-md">
        <p className="mb-4">使用 WASD 或方向键来控制你的飞船。</p>
        <p className="mb-4">按空格键射击。摧毁所有小行星以进入下一关。</p>
        <p>小心！如果你的飞船被击中，你将失去一条生命！</p>
      </div>
      <button
        className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition"
        onClick={onStartGame}
      >
        开始游戏
      </button>
    </div>
  );
};

export default StartScreen;