import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

import "./StickyNote.css";

function StickyNote({ initialPosition,randomNum, totalSticky, setTotalSticky, stickyId }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);

  //Determine sticky note color
  let backgroundColor = stickyId % 3 == 0 ? "#fcfc6f" : stickyId % 2 == 0 ? "#6fa5fc" : "#c893fa";

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
    height: '200px',
    backgroundColor: backgroundColor,
    cursor: isDragging ? 'move' : 'default',
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid black',
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
  };

  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  //Removes sticky from stack
  const handleClick = (index) => {
    const newActive = totalSticky.filter((item) => {
      return item.id != index
    });
    setTotalSticky(newActive);
  };

  return (
    <div
      className="box artStyle"
      ref={boxRef}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <Icon onClick={() => handleClick(stickyId)} id="trash-can" icon="akar-icons:trash-can" width={20} height={20} />
      <textarea
        className="sticky-note-text"
        value={text}
        onChange={handleChange}
        placeholder="Write something..."
      />
    </div>
  );
}

export default StickyNote;