import React, { useState, useRef, useEffect } from 'react';

import "./PomodoroTimer.css";

function PomodoroTimer({ initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (event) => {
    if (boxRef.current.contains(event.target)) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const appRect = document.body.getBoundingClientRect();
      const containerRect = boxRef.current.parentNode.getBoundingClientRect();
      const boxRect = boxRef.current.getBoundingClientRect();
      const maxX = containerRect.width - boxRect.width;
      const maxY = appRect.height - boxRect.height;
      let newX = position.x + event.movementX;
      let newY = position.y + event.movementY;
      newX = Math.min(Math.max(newX, 0), maxX);
      newY = Math.min(Math.max(newY, 0), maxY);
      const newPosition = { x: newX, y: newY };
      setPosition(newPosition);
    }
  };

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            alert("Time's up!");
            setIsRunning(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(25);
  };

  const handleTimer5 = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(5);
    setIsRunning(true);
  };

  const handleBreak15 = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(15);
    setIsRunning(true);
  };

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const boxStyle = {
    position: 'absolute',
    left: position.x + 'px',
    top: position.y + 'px',
    width: '300px',
    borderRadius: '15px',
    height: '125px',
    backgroundColor: '#D9D9D9',
    cursor: isDragging ? 'move' : 'default',
    display: 'flex',
    flexDirection: "column",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
  };

  return (
    <div
      className="box"
      ref={boxRef}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <h3>Pomodoro Timer</h3>
      <div id="type-container">
        <button onClick={handleStart}>Pomodoro</button>
        <button onClick={handleTimer5}>Short Break</button>
        <button onClick={handleBreak15}>Long Break</button>
      </div>
      <p id="timer">{formattedTime}</p>
      <div id="buttons-container">
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;