import {React, useState, useEffect} from 'react'
import Hero from '../components/Hero'
import GenreSlider from '../components/GenreSlider'
import Footer from '../components/Footer'
import { front } from '../utils/frontMovies'
import Navbar from '../components/Navbar'
import SeriesGenreSlider from '../components/SeriesGenreSlider'

function Movies() {


  
  return (
    <div className='z-[90] relative' >
      <Navbar/>
      <Hero frontMovies={front} />
      <GenreSlider title='Popular Movies' url1='https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' url2='https://api.themoviedb.org/3/movie/popular?language=en-US&page=2' />
      <GenreSlider title='Top rated Movies' url1='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1' url2='https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2'/>
      <GenreSlider title='Marvel Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=420' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_companies=420'/>
      <GenreSlider title='Action Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=28' />
      <GenreSlider title='Drama Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=18' />
      <GenreSlider title='Adventure Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=12' />
      <GenreSlider title='Crime Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=80' />
      <GenreSlider title='Horror Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=27' />
      <GenreSlider title='Comedy Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=35' />
      <GenreSlider title='War Movies' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10752' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=10752' />
      <Footer/>
    </div>
  )
}

export default Movies
