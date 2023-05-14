import React, { useState, useRef, useEffect } from 'react';
import Box from '../Box/Box';
import "./AppSpace.css"

function AppSpace() {
  return (
    <div className="App">
      <Box initialPosition={{ x: 50, y: 50 }} />
      <Box initialPosition={{ x: 200, y: 200 }} />
      <Box initialPosition={{ x: 350, y: 350 }} />
    </div>
  );
}

export default AppSpace