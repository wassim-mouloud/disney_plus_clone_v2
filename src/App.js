import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './sections/Home';
import Movies from './sections/Movies'
import Series from './sections/Series';
import Search from './sections/Search';
import MovieDetail from './sections/MovieDetail';
import SeriesDetail from './sections/SeriesDetail';
import Login from './sections/Login';
import Watchlist from './sections/Watchlist';
function App() {



  return (
    <div className="relative">
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/Movies' element={<Movies/>} ></Route>
        <Route path='/Series' element={<Series/>} ></Route>
        <Route path='/Search' element={<Search/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='MovieDetail/:id' element={<MovieDetail/>}></Route>
        <Route path='SeriesDetail/:id' element={<SeriesDetail/>}></Route>
        <Route path='/Watchlist' element={<Watchlist/>}></Route>        
      </Routes>
    </div>
  );
}

export default App;
