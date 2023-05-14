import React, { useState, useRef, useEffect } from 'react';
import Box from '../Box/Box';
import YouTubeBox from '../YouTubeBox/YouTubeBox';
import "./AppSpace.css"
import ColorChanger from '../ColorChanger/ColorChanger';

function AppSpace() {
  return (
    <div className="App">
      <Box initialPosition={{ x: 50, y: 50 }} />
      <Box initialPosition={{ x: 200, y: 200 }} />
      <YouTubeBox initialPosition={{ x: 350, y: 350 }} />
      <ColorChanger initialPosition={{ x: 100, y: 100 }} />
    </div>
  );
}

export default AppSpace