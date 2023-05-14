import React, { useState, useRef, useEffect } from 'react';

function Box({ initialPosition }) {

  // Define state for the box position and whether it's being dragged
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  // Use useRef to get a reference to the box element
  const boxRef = useRef(null);

  // Add an event listener to handle the mouse up event
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };
    window.addEventListener('mouseup', handleMouseUp);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Handle the mouse down event to start dragging
  const handleMouseDown = (event) => {
    if (boxRef.current.contains(event.target)) {
      setIsDragging(true);
    }
  };

  // Handle the mouse move event while dragging
  const handleMouseMove = (event) => {
    if (isDragging) {
      // Get the bounding rectangles of the app, container, and box elements
      const appRect = document.body.getBoundingClientRect();
      const containerRect = boxRef.current.parentNode.getBoundingClientRect();
      const boxRect = boxRef.current.getBoundingClientRect();

      // Calculate the maximum X and Y positions for the box
      const maxX = containerRect.width - boxRect.width;
      const maxY = appRect.height - boxRect.height;

      // Calculate the new X and Y positions for the box, constraining within the container bounds
      let newX = position.x + event.movementX;
      let newY = position.y + event.movementY;
      newX = Math.min(Math.max(newX, 0), maxX);
      newY = Math.min(Math.max(newY, 0), maxY);

      // Set the new position state
      const newPosition = { x: newX, y: newY };
      setPosition(newPosition);
    }
  };
  
  // Define the styles for the box element
  const boxStyle = {
    position: 'absolute',
    left: position.x + 'px',
    top: position.y + 'px',
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    cursor: isDragging ? 'move' : 'default',
  };

  // Render the box component
  return (
    <div
      className="box"
      ref={boxRef}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      component
    </div>
  );
}

export default Box;
