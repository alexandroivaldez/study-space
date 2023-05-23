import React from 'react'
import "./Menu.css"
import { Icon } from '@iconify/react';

function Menu({isActive, setActive, addSticky}) {

    const handleClick = (index) => {
        const newActive = [...isActive];
        
        if(isActive[index].item == 1){
            newActive[index].item = 2;
        } else {
            newActive[index].item = 1;
        }

        setActive(newActive);
    };

    return (
        <div className='menu-container artStyle'>
            <Icon onClick={() => handleClick(0)} value="timer" className="menuItem" icon="material-symbols:timer-outline"  width="50" height="50" />
            <Icon onClick={() => handleClick(1)} value="youtube" className="menuItem" icon="ant-design:youtube-outlined"  width="50" height="50" />
            <Icon onClick={() => handleClick(2)} value="colorPallet" className="menuItem" icon="bi:paint-bucket" width="50" height="50" />
            <Icon onClick={addSticky} value="notes" className="menuItem" icon="material-symbols:add-notes-outline-rounded"  width="50" height="50" />
            <Icon onClick={() => handleClick(3)} value="todo" className="menuItem" icon="icons8:todo-list"  width="50" height="50" />
        </div>
    )
}

export default Menu