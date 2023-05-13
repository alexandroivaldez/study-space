import { useState } from 'react'
import './App.css'
import AppSpace from './components/AppSpace/AppSpace'
import SideMenu from './components/SideMenu/SideMenu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <SideMenu />
      <AppSpace />
    </div>
  )
}

export default App
