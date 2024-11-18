import { useState } from 'react'
import Home from './components/Home/Home'
import HeaderBar from './components/Navbar/Navbar'
import MovCarousel from './components/MovieCarousel/MovCarousel'
import Jumbo from './components/Jumbo/Jumbo'
function App() {


  return (
    <>
      <HeaderBar/>
      <Jumbo/>
      <MovCarousel/>
    
     
    </>
  )
}

export default App
