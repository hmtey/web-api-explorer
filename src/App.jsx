import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ServiceDetails from './pages/serviceDetails'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/:service" element={<ServiceDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
