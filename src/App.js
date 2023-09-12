import {Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './sections/Home';
import Movies from './sections/Movies'
import Series from './sections/Series';
import Search from './sections/Search';
import MovieDetail from './sections/MovieDetail';
import SeriesDetail from './sections/SeriesDetail';
import Login from './sections/Login';
import Watchlist from './sections/Watchlist';
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { db} from './config/firebase'
function App() {

  const [watchlistMovies, setWatchlistMovies] = useState([])
  const [watchlistSeries, setWatchlistSeries] = useState([])
  const [allWatchlist, setAllWatchlist] = useState([])
  const movieCollectionRef = collection(db, 'watchlist_movies')
  const seriesCollectionRef = collection(db, 'watchlist_series')
  const [hovered, setHovered]= useState(false)
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


  const handleMouseEnter = async (id) => {
      setHoveredMovieId(id)
      await sleep(500)
      setHovered(true)
  }

  const handleMouseLeave = () => {
      setHoveredMovieId(null)
      setHovered(false)
  }

  const getMovies = async ()=>{
    try{
        const data= await getDocs(movieCollectionRef)
        const filteredData = data.docs.map((doc) => (
            {
                ...doc.data(),
                id : doc.id
            }
        ) )
        setWatchlistMovies(filteredData)
    } catch(e){
        console.error(e)
    }
}

  useEffect(()=>{
    getMovies()
}, [])

const getSeries = async ()=>{
  try{
      const data= await getDocs(seriesCollectionRef)
      console.log(data.docs)
      const filteredData = data.docs.map((doc) => (
          {
              ...doc.data(),
              id : doc.id
          }
      ) )
      setWatchlistSeries(filteredData)
  } catch(e){
      console.error(e)
  }
}

useEffect(()=>{
    getSeries()
}, [])

const addMovieToWatchlist = async (movie) => {
  await addDoc(movieCollectionRef, {backdrop_path:movie?.backdrop_path, poster_path:movie?.poster_path, genre_ids:movie?.genre_ids, original_title:movie?.original_title, overview:movie?.overview, release_date:movie?.release_date, vote_average: movie?.vote_average, movie_id: movie?.id})
}

const addSeriesToWatchlist = async (movie) => {
  await addDoc(seriesCollectionRef, {backdrop_path:movie?.backdrop_path, poster_path:movie?.poster_path, genre_ids:movie?.genre_ids, name:movie?.name, overview:movie?.overview, first_air_date:movie?.first_air_date, vote_average: movie?.vote_average, series_id: movie?.id})
}


  return (
    <div className="relative">
      <Routes>
        <Route path='/' element={<Home hovered={hovered} hoveredMovieId={hoveredMovieId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />} ></Route>
        <Route path='/Movies' element={<Movies hovered={hovered} hoveredMovieId={hoveredMovieId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />} ></Route>
        <Route path='/Series' element={<Series/>} ></Route>
        <Route path='/Search' element={<Search watchlistMovies={watchlistMovies}  watchlistSeries={watchlistSeries}  getWatchlistMovies={getMovies} getWatchlistSeries={getSeries} addMovieToWatchlist={addMovieToWatchlist} addSeriesToWatchlist={addSeriesToWatchlist} hovered={hovered}  hoveredMovieId={hoveredMovieId}  handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='MovieDetail/:id' element={<MovieDetail hovered={hovered} hoveredMovieId={hoveredMovieId} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>}></Route>
        <Route path='SeriesDetail/:id' element={<SeriesDetail/>}></Route>
        <Route path='/Watchlist' element={<Watchlist watchlistMovies={watchlistMovies} setWatchlistMovies={setWatchlistMovies} watchlistSeries={watchlistSeries} setWatchlistSeries={setWatchlistSeries} allWatchlist={allWatchlist} setAllWatchlist={setAllWatchlist} getMovies={getMovies} getSeries={getSeries} hovered={hovered} hoveredMovieId={hoveredMovieId}  handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />}></Route>        
      </Routes>
    </div>
  );
}

export default App;
