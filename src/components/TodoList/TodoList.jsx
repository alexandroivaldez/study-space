import React, { useState, useRef, useEffect } from 'react';
import "./TodoList.css";
import { Icon } from '@iconify/react';

function TodoList({ initialPosition, isActive, setActive }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const boxRef = useRef(null);

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if(todos.length == 6){
      alert("5 Todo Limit. Please complete your other todos before adding more.");
    } else {
      if (newTodo.trim() !== '') {
        setTodos([...todos, newTodo]);
        setNewTodo('');
      }
    }
    
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
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

  const handleClick = (index) => {
    const newActive = [...isActive];
    
    if(isActive[index].item == 1){
        newActive[index].item = 2;
    } else {
        newActive[index].item = 1;
    }

    setActive(newActive);
  };
  
  const boxStyle = {
    position: 'absolute',
    left: position.x + 'px',
    top: position.y + 'px',
    width: '400px',
    height: '320px',
    display: 'flex',
    flexDirection: "column",
    backgroundColor: 'white',
    cursor: isDragging ? 'move' : 'default',
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
  };

  //list item color section
  const colors = ["#91faad", "#fffd91", "#f59090", "#8ea3f5", "#df93fa", "#fac893"];

  return (
    <div
      className="box artStyle"
      ref={boxRef}
      style={boxStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className='tool-bar' id="todoToolBar">
          <div className='x-box' onClick={() => handleClick(3)}><p>X</p></div>
          <h2>Todo List</h2>
      </div>
      <div id="core-todo-container">
        <div id="input-container">
          <input className="artStyle" maxLength="35" id="inputBox" type="text" value={newTodo} onChange={handleInputChange} placeholder="Enter todo here (35 character limit)"/>
          <button className="artStyle" onClick={handleAddTodo}>Add Todo</button>
        </div>
        <ul id="todo-container">
          {todos.map((todo, index) => (
            <li key={index} style={{backgroundColor: colors[index]}}>
              {todo}
              <Icon id="checkMark" onClick={() => handleDeleteTodo(index)} icon="carbon:checkmark-outline" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;