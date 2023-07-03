import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './sections/Home';
import Navbar from './components/Navbar';
import Movies from './sections/Movies'
import Series from './sections/Series';
import Search from './sections/Search';
function App() {



  return (
    <div className="relative">
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/Movies' element={<Movies/>} ></Route>
        <Route path='/Series' element={<Series/>} ></Route>
        <Route path='/Search' element={<Search/>}></Route>

      </Routes>

    </div>
  );
}

export default App;
