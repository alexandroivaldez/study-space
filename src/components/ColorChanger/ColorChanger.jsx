import React, { useState, useRef, useEffect } from 'react';
import "./ColorChanger.css";

function ColorChanger({ initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);

  const colors = ["red", "green", "blue", "yellow", "orange", "pink", "grey", "white","red", "green", "blue", "yellow", "orange", "pink", "grey", "white"];

  const circlesArray = colors.map((str, index) => (
    <div
      key={index}
      className="color-circle"
      style={{backgroundColor: str}}
      onClick={() => {
        alert("Test!");
      }}
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
    backgroundColor: 'grey',
    borderRadius: "15px",
    cursor: isDragging ? 'move' : 'default',
    display: 'flex',
    alignItems: 'center',
    flexDirection: "column"
  };

  return (
    <div
      className="box"
      ref={boxRef}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <h2>Color Pallete</h2>
      <div className='color-box'>
        {circlesArray}
      </div>
    </div>
  );
}

export default ColorChanger;