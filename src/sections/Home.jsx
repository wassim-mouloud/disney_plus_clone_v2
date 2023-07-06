import {React, useState, useEffect} from 'react'
import { front } from '../utils/frontMovies'
import Navbar from '../components/Navbar'
import GenreSlider from '../components/GenreSlider'
import Hero from '../components/Hero'
import SeriesGenreSlider from '../components/SeriesGenreSlider'
import Footer from '../components/Footer'
function Home() {

    const [frontMovies, setFrontMovies]= useState([])

    useEffect(()=>{
      setFrontMovies(front)
    }, [])

  return (
    <div className='z-[90] relative' >
            <Navbar/>

      <Hero frontMovies={frontMovies} />
      <GenreSlider title='Popular Movies' url1='https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' url2='https://api.themoviedb.org/3/movie/popular?language=en-US&page=2' />
      <SeriesGenreSlider title='Popular Series' url1='https://api.themoviedb.org/3/trending/tv/day?language=en-US' url2='https://api.themoviedb.org/3/trending/tv/day?language=en-US'/>
      <GenreSlider title='Top rated Movies' url1='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' url2='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2'/>
      <SeriesGenreSlider mb='100px' title='Top Rated Series' url1='https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1' url2='https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=2' />
      <Footer/>
    </div>
  )
}

export default Home