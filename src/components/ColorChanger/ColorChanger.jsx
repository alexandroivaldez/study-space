import React, { useState, useRef, useEffect } from 'react';
import "./ColorChanger.css";

function ColorChanger({ initialPosition, setBackgroundColor }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);

  const colors = ["#a7a1ff", "#a5d9c6", "#fedee3", "#ffe599", "#ffb3ba", "#ffdfba", "	#ffffba", "	#baffc9","#bae1ff", "#ffdef2", "#f2e2ff", "#e2eeff", "#ddfffc", "#ffffe3", "#83adb5", "#c7bbc9"];

  const circlesArray = colors.map((str, index) => (
    <div
      key={index}
      className="color-circle"
      style={{backgroundColor: str}}
      onClick={() => setBackgroundColor(str)}
    ></div>
  ));


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
  
  const boxStyle = {
    position: 'absolute',
    left: position.x + 'px',
    top: position.y + 'px',
    width: '200px',
    height: '250px',
    backgroundColor: '#D9D9D9',
    borderRadius: "15px",
    cursor: isDragging ? 'move' : 'default',
    display: 'flex',
    alignItems: 'center',
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
      <h2>Color Pallet</h2>
      <div className='color-box'>
        {circlesArray}
      </div>
    </div>
  );
}

export default ColorChanger;