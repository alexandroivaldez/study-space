import React from 'react'
import Menu from '../Menu/Menu'
import "./SideMenu.css"

function SideMenu(props) {
  return (
    <div className='sideMenu-container' style={{backgroundColor: props.backgroundColor}}>
        <Menu />
    </div>
  )
}

export default SideMenu