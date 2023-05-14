import React, { useState, useRef, useEffect } from 'react';
import "./AppSpace.css"

function AppSpace() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const appRef = useRef(null);
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
      const appRect = appRef.current.getBoundingClientRect();
      const boxRect = boxRef.current.getBoundingClientRect();
      const maxX = appRect.width - boxRect.width;
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
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    cursor: isDragging ? 'move' : 'default',
  };

  return (
    <div className="appSpace-container" ref={appRef} onMouseMove={handleMouseMove}>
      <div
        className="box"
        ref={boxRef}
        style={boxStyle}
        onMouseDown={handleMouseDown}
      >
        component
      </div>
    </div>
  );
}

export default AppSpace