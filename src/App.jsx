import React from 'react'
import NavBar from './Components/Navbar/NavBar'
import {originals,action, comedy, horror, romantic, documentary} from './urls'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost' 


function App() {
  return (
    <div className='row'>
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals' />
      <RowPost url={action} title='Action Movies' isSmall />
      <RowPost url={comedy} title='Comedy Movies' isSmall />
      <RowPost url={horror} title='Horror Movies' isSmall />
      <RowPost url={romantic} title='Romantic Movies' isSmall />
      <RowPost url={documentary} title='Documentaries' isSmall />





    </div>
  )
}

export default App
