import React from 'react'
import "./Menu.css"
import { Icon } from '@iconify/react';

function Menu(props) {

    const iconColor = "black";

    return (
        <div className='menu-container'>
            <Icon icon="bi:paint-bucket" color={iconColor} width="50" height="50" />
            <Icon icon="material-symbols:timer-outline" color={iconColor} width="50" height="50" />
            <Icon icon="ant-design:youtube-outlined" color={iconColor} width="50" height="50" />
            <Icon icon="material-symbols:add-notes-outline-rounded" color={iconColor} width="50" height="50" />
            <Icon icon="icons8:todo-list" color={iconColor} width="50" height="50" />
        </div>
    )
}

export default Menu