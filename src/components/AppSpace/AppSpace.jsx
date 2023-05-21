import React, { useState, useRef, useEffect } from 'react';
import Box from '../Box/Box';
import YouTubeBox from '../YouTubeBox/YouTubeBox';
import "./AppSpace.css"
import ColorChanger from '../ColorChanger/ColorChanger';
import SideMenu from '../SideMenu/SideMenu';
import PomodoroTimer from '../PomodoroTimer/PomodoroTimer';
import StickyNote from '../StickyNote/StickyNote';

function AppSpace(props) {

  const [isActive, setActive] = useState([
    {item: 1},
    {item: 1},
    {item: 1}
  ]);

  return (
    <div className="App" style={{backgroundColor: props.backgroundColor}}>
      <SideMenu isActive={isActive} setActive={setActive} backgroundColor={props.backgroundColor} />
      <div className={isActive[0].item == 1 ? "active" : "inactive"}>
        <PomodoroTimer isActive={isActive} setActive={setActive} initialPosition={{ x: 400, y: 50 }} />
      </div>
      <div className={isActive[1].item == 1 ? "active" : "inactive"}>
        <YouTubeBox isActive={isActive} setActive={setActive} initialPosition={{ x: 800, y: 200 }} />
      </div>
      <div className={isActive[2].item == 1 ? "active" : "inactive"}>
        <ColorChanger initialPosition={{ x: 100, y: 100 }}
        backgroundColor={props.backgroundColor}
        setBackgroundColor={props.setBackgroundColor}
        isActive={isActive} setActive={setActive}
        />
      </div>
      <StickyNote initialPosition={{ x: 500, y: 200 }} /> 
      {/* <Box initialPosition={{ x: 500, y: 200 }} /> */}
    </div>
  );
}

export default AppSpace