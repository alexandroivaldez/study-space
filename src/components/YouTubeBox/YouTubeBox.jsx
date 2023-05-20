import React, { useState, useRef, useEffect } from 'react';
import "./YouTubeBox.css";

function YouTubeBox({ initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);
  const [youtubeLink, setYouTubeLink] = useState("https://www.youtube.com/embed/d9YM_9CVmtc");

  const youtubeLinks = [
    "https://www.youtube.com/embed/d9YM_9CVmtc",
    "https://www.youtube.com/embed/rJTw_LmDS4Y",
    "https://www.youtube.com/embed/kw7NotzRtBs"
  ]

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
    borderRadius: '15px',
    width: '456px',
    height: '328px',
    backgroundColor: '#D9D9D9',
    cursor: isDragging ? 'move' : 'default',
    display: 'flex',
    flexDirection: 'column',
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
  };

const changeYouTubeLink = (num) => {
    setYouTubeLink(youtubeLinks[num]);
}


  return (
    <div
      className="box artStyle"
      ref={boxRef}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
        <div className='tool-bar'>
          <div className='x-box'><p>X</p></div>
          <h2>Lofi Player</h2>
        </div>
        <iframe id="youtubeFrame"  src={youtubeLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <div id="lofi-circle-container">
            <img className="lofi-circle" src="./lofi0.png" onClick={() => changeYouTubeLink(0)}/>
            <img className="lofi-circle" src="./lofi1.png" onClick={() => changeYouTubeLink(1)}/>
            <img className="lofi-circle" src="./lofi2.png" onClick={() => changeYouTubeLink(2)}/>
            <img className="lofi-circle" src="./lofi3.png" />
            <img className="lofi-circle" src="./lofi4.png" />
            <img className="lofi-circle" src="./lofi5.png" />
            <img className="lofi-circle" src="./lofi6.png" />
            <img className="lofi-circle" src="./lofi1.png" />
        </div>
    </div>
  );
}

export default YouTubeBox;