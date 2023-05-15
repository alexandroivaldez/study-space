import React, { useState, useRef, useEffect } from 'react';
import Box from '../Box/Box';
import YouTubeBox from '../YouTubeBox/YouTubeBox';
import "./AppSpace.css"
import ColorChanger from '../ColorChanger/ColorChanger';
import SideMenu from '../SideMenu/SideMenu';

function AppSpace(props) {
  return (
    <div className="App" style={{backgroundColor: props.backgroundColor}}>
      <SideMenu backgroundColor={props.backgroundColor} />
      {/* <Box initialPosition={{ x: 100, y: 50 }} />
      <Box initialPosition={{ x: 500, y: 200 }} /> */}
      <YouTubeBox initialPosition={{ x: 350, y: 350 }} />
      <ColorChanger initialPosition={{ x: 100, y: 100 }}
      backgroundColor={props.backgroundColor}
      setBackgroundColor={props.setBackgroundColor}
      />
    </div>
  );
}

export default AppSpace