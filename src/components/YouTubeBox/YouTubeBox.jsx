import React, { useState, useRef, useEffect } from 'react';
import "./YouTubeBox.css";

function YouTubeBox({ initialPosition, isActive, setActive }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);
  const [youtubeLink, setYouTubeLink] = useState("https://www.youtube.com/embed/jfKfPfyJRdk");

  const youtubeLinks = [
    "https://www.youtube.com/embed/jfKfPfyJRdk",
    "https://www.youtube.com/embed/d9YM_9CVmtc",
    "https://www.youtube.com/embed/YhuSvjgtVqs",
    "https://www.youtube.com/embed/YOJsKatW-Ts",
    "https://www.youtube.com/embed/sA0qrPOMy2Y",
    "https://www.youtube.com/embed/e_usPJNFrDU",
    "https://www.youtube.com/embed/XlVd82QgACg"
  ]

  const handleClick = (index) => {
    const newActive = [...isActive];
    
    if(isActive[index].item == 1){
        newActive[index].item = 2;
    } else {
        newActive[index].item = 1;
    }

    setActive(newActive);
};

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
    backgroundColor: 'white',
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
          <div className='x-box' onClick={() => handleClick(1)}><p>X</p></div>
          <h2>Lofi Player</h2>
        </div>
        <iframe id="youtubeFrame"  src={youtubeLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <div id="lofi-circle-container">
            
            <img className="lofi-circle" src="./lofi1.png" onClick={() => changeYouTubeLink(0)}/>
            <img className="lofi-circle" src="./lofi2.png" onClick={() => changeYouTubeLink(1)}/>
            <img className="lofi-circle" src="./lofi3.png" onClick={() => changeYouTubeLink(2)}/>
            <img className="lofi-circle" src="./lofi4.png" onClick={() => changeYouTubeLink(3)}/>
            <img className="lofi-circle" src="./lofi5.png" onClick={() => changeYouTubeLink(4)}/>
            <img className="lofi-circle" src="./lofi6.png" onClick={() => changeYouTubeLink(5)}/>
            <img className="lofi-circle" src="./lofi7.png" onClick={() => changeYouTubeLink(6)}/>
        </div>
    </div>
  );
}

export default YouTubeBox;