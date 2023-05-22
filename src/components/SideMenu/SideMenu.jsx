import React from 'react'
import Menu from '../Menu/Menu'
import "./SideMenu.css"

function SideMenu({backgroundColor, isActive, setActive, addSticky}) {
  return (
    <div className='sideMenu-container' style={{backgroundColor: backgroundColor}}>
        <Menu addSticky={addSticky} isActive={isActive} setActive={setActive} />
    </div>
  )
}

export default SideMenu