import { useState } from 'react'
import './App.css'
import AppSpace from './components/AppSpace/AppSpace'
import SideMenu from './components/SideMenu/SideMenu'

function App() {
  const [backgroundColor, setBackgroundColor] = useState("#a5d9c6");

  return (
    <div className="app-container">
      <AppSpace backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} />
    </div>
  )
}

export default App
