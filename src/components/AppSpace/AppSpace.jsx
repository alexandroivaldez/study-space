import React, { useState, useRef, useEffect } from 'react';
import Box from '../Box/Box';
import YouTubeBox from '../YouTubeBox/YouTubeBox';
import "./AppSpace.css"
import ColorChanger from '../ColorChanger/ColorChanger';
import SideMenu from '../SideMenu/SideMenu';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';

function AppSpace(props) {
  return (
    <div className="App" style={{backgroundColor: props.backgroundColor}}>
      <SideMenu backgroundColor={props.backgroundColor} />
      <PomodoroTimer initialPosition={{ x: 400, y: 50 }} />
      {/* <Box initialPosition={{ x: 500, y: 200 }} /> */}
      <YouTubeBox initialPosition={{ x: 800, y: 200 }} />
      <ColorChanger initialPosition={{ x: 100, y: 100 }}
      backgroundColor={props.backgroundColor}
      setBackgroundColor={props.setBackgroundColor}
      />
    </div>
  );
}

export default AppSpace