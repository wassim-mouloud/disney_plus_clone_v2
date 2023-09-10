import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import SearchCard from '../components/SearchCard'
import '../App.css'


function Search({setWatchlistMovies, setWatchlistSeries}) {
    const [popular, setPopular]= useState([]);
    const [content, setContent]= useState([]);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [title, setTitle]= useState('Popular Searches')
    const [hovered, setHovered]= useState(false)
    const inputRef= useRef(null)
    const [isLoading, setIsLoading] = useState(true);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setPopular(response.results))
            .catch(err => console.error(err));
    }, []);
    
    useEffect(() => setContent(popular), [popular]);

    const handleChange = async (e) => {
        const word = e.target.value;
    
        if(word===""){
            setContent(popular);
            setTitle("Popular Searches")
        }else{
            const movies = await getMovies(word);
            const series = await getSeries(word);
            setTitle("Top Results")
            setContent([...movies, ...series]);
        }
    }
    
    const getMovies = async (word) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${word}&include_adult=false&language=en-US&page=1`, options);
        const json = await response.json();
        return json.results.slice(0,5);
    }
    
    const getSeries = async (word) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${word}&include_adult=false&language=en-US&page=1`, options);
        const json = await response.json();
        return json.results.slice(0,5);
    }
    

    return (
        <div className='relative'>
            <Navbar/>
            <div className='w-screen ' >
                <div className='w-[90%] lg:w-[calc(100vw-100px)] xl:w-[calc(100vw-140px)] h-[55px] lg:h-[65px] overflow-y-hidden flex items-center gap-2 bg-[#262833] mt-5  rounded-[7px] m-6 lg:m-8 lg:ml-[100px] p-4 ' >
                    <img loading='lazy' src="/images/search.png" alt="" className='w-4 h-4 lg:w-8 lg:h-8' />
                    <input ref={inputRef} onChange={handleChange} type="text" placeholder='Movies, shows and more' className='w-[100%] h-[40px] rounded-[7px] bg-[#262833] outline-none text-white text-[16px] lg:text-[18px]'/>
                </div>
                <p className='text-white  text-[20px] lg:text-[24px] font-semibold  px-6 py-3 lg:p-3 lg:pl-[100px]' >{title}</p>
                <div  className='w-screen lg:w-[calc(100vw-100px)] xl:w-[calc(100vw-140px)] grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2  mb-[120px] lg:mb-0 p-6 lg:p-0 lg:m-8 lg:ml-[100px] ' >
                    {content.map((movie, index) => 
                        movie.poster_path ? (
                            <SearchCard movie={movie} index={index}  setWatchlistMovies={setWatchlistMovies} setWatchlistSeries={setWatchlistSeries} />
                        ) : null
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search;
