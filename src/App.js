import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './sections/Hero'
import {front} from '../src/utils/frontMovies'
import GenreSlider from './components/GenreSlider';
import SeriesGenreSlider from './components/SeriesGenreSlider'
function App() {
  const [frontMovies, setFrontMovies]= useState([])

  useEffect(()=>{
    setFrontMovies(front)
  }, [])


  return (
    <div className="relative h-[250vh] ">
      <Navbar/>
      <Hero frontMovies={frontMovies} />
      <GenreSlider title='Popular Movies' url1='https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' url2='https://api.themoviedb.org/3/movie/popular?language=en-US&page=2' />
      {/* <SeriesGenreSlider title='Popular Series' url1='https://api.themoviedb.org/3/tv/popular?language=en-US&page=1' url2='https://api.themoviedb.org/3/tv/popular?language=en-US&page=2'/> */}
      <GenreSlider title='Top rated Movies' url1='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' url2='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2'/>
      <SeriesGenreSlider title='Top Rated Series' url1='https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1' url2='https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=2' />


    </div>
  );
}

export default App;
