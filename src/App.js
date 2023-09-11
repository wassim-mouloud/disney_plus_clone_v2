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
import { getDocs, collection, deleteDoc } from 'firebase/firestore'
import { db} from './config/firebase'
function App() {

  const [watchlistMovies, setWatchlistMovies] = useState([])
  const [watchlistSeries, setWatchlistSeries] = useState([])
  const [allWatchlist, setAllWatchlist] = useState([])

  const movieCollectionRef = collection(db, 'watchlist_movies')
  const seriesCollectionRef = collection(db, 'watchlist_series')

  useEffect(()=>{
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
    getMovies()
}, [])

useEffect(()=>{
    const getSeries = async ()=>{
        try{
            const data= await getDocs(seriesCollectionRef)
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
    getSeries()
}, [])


  return (
    <div className="relative">
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/Movies' element={<Movies/>} ></Route>
        <Route path='/Series' element={<Series/>} ></Route>
        <Route path='/Search' element={<Search watchlistMovies={watchlistMovies} setWatchlistMovies={setWatchlistMovies} watchlistSeries={watchlistSeries} setWatchlistSeries={setWatchlistSeries} allWatchlist={allWatchlist} setAllWatchlist={setAllWatchlist} />}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='MovieDetail/:id' element={<MovieDetail/>}></Route>
        <Route path='SeriesDetail/:id' element={<SeriesDetail/>}></Route>
        <Route path='/Watchlist' element={<Watchlist watchlistMovies={watchlistMovies} setWatchlistMovies={setWatchlistMovies} watchlistSeries={watchlistSeries} setWatchlistSeries={setWatchlistSeries} allWatchlist={allWatchlist} setAllWatchlist={setAllWatchlist} />}></Route>        
      </Routes>
    </div>
  );
}

export default App;
