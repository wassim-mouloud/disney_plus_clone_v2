import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './sections/Hero'
import {front} from '../src/utils/frontMovies'

function App() {
  const [frontMovies, setFrontMovies]= useState([])

  useEffect(()=>{
    setFrontMovies(front)
  }, [])


  return (
    <div className="relative h-[200vh] ">
      <Navbar/>
      <Hero frontMovies={frontMovies} />
    </div>
  );
}

export default App;
