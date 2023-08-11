import React, { useEffect, useRef, useState } from 'react';
import { movie_genres,tv_genres } from '../utils/genres';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import '../App.css'
import {motion} from 'framer-motion'

function Search() {
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

    const handleMouseEnter = async (id) => {
        setHoveredMovieId(id)
        await sleep(500)
        setHovered(true)
    }
  
    const handleMouseLeave = () => {
        setHoveredMovieId(null)
        setHovered(false)
    }

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
            <div className='w-screen' >
                <div className='w-[90%] lg:w-[80%] flex items-center gap-2 bg-[#262833] mt-5 mx-auto rounded-[7px] p-4' >
                    <img loading='lazy' src="/images/search.png" alt="" className='w-6 h-6 lg:w-8 lg:h-8' />
                    <input ref={inputRef} onChange={handleChange} type="text" placeholder='Movies, shows and more' className='w-[100%] h-[40px] rounded-[7px] bg-[#262833] outline-none text-white text-[14px] lg:text-[18px]'/>
                </div>
                <p className='text-white w-[90%] lg:w-[80%] mx-auto text-[20px] font-semibold py-4' >{title}</p>

                <div layout className='w-[90%] lg:w-[80%] grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-2  mx-auto mb-[120px] lg:mb-0' >
                    {content.map((movie, index) => 
                        movie.poster_path ? (
                                <Link
                                    to={`${index < content.length/2  || inputRef.current.value===''?`/MovieDetail/${movie.id}`:`/SeriesDetail/${movie.id}`}`}
                                    key={index}
                                    layout
                                    className={`group fade h-[220px] md:h-[220px] lg:h-[245px]  rounded-[7px] bg-[#16181f] cursor-pointer transition-transform duration-500 ${hovered && movie.id===hoveredMovieId?'lg:hover:scale-x-[1.7] lg:hover:scale-y-[1.4] lg:hover:z-[99]':''} ${index%6===0?'lg:origin-left':''} ${index%6===5 && index!==0? 'lg:origin-right':''} `}
                                    onMouseEnter={()=>handleMouseEnter(movie.id)}
                                    onMouseLeave={handleMouseLeave}>
                                    {/* <img
                                        loading='lazy'
                                        onLoad={()=>setIsLoading(false)}
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt=""
                                        className={`${isLoading?'skeleton':''} rounded-t-[5px] h-full w-full ${hovered && movie.id===hoveredMovieId?'lg:group-hover:h-[40%]  lg:group-hover:object-cover lg:group-hover:object-top':''} `}
                                    /> */}
                                    <img loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className={`skeleton rounded-[5px] h-full w-full ${hovered && movie.id===hoveredMovieId?'lg:hidden':''}    `}/>
                                    <img loading='lazy' src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="" className={`skeleton w-full object-cover rounded-[5px] ${hovered && movie.id===hoveredMovieId?'lg:group-hover:h-[40%] hidden lg:flex ':'hidden'} `}/>
                                    
                                    <div className={`flex-col items-start justify-between h-[calc(60%-16px)] hidden w-full py-2 px-2 mt-1 ${hovered && movie.id===hoveredMovieId?'lg:group-hover:flex':''}`} >
                                        <div className='flex gap-2 w-[95%]' >
                                            <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation();
                                                window.open(`https://www.youtube.com/watch?v=rcBntNCD4ZY`, '_blank');
                                            }}
                                            className='text-[8px] h-[30px] w-[135px] flex justify-center items-center gap-1 bg-[#d9d9da] rounded-[5px] lg:hover:scale-105 transition-all' >
                                                <img loading='lazy' src="/images/dark-blue-play.png" alt="" className='w-2 h-2'/>
                                                <span className='font-medium text-[#16181f]' >Watch Now</span>
                                            </button>
                                            <button className='text-[8px] h-[30px] w-[30px] flex justify-center items-center bg-[rgba(40,42,49,255)] rounded-[5px] text-white lg:hover:scale-105 transition-all ' >+</button>
                                        </div>
                                        <p className='font-bold text-[10px] text-[#d9d9da] py-1' >{index< content.length/2  || inputRef.current.value==='' ?movie.original_title:movie.original_name}</p>
                                        <div className='w-[95%] flex flex-col gap-1' >
                                            <div className='flex gap-1  items-center text-[8px] font-medium ' >
                                            <span className='text-[#d9d9da] text-[8px]' >
                                                {index < content.length/2 || inputRef.current.value===''
                                                    ? (typeof(movie.release_date) === 'string' ? movie.release_date.slice(0, 4) : null)
                                                    : (typeof(movie?.first_air_date) === 'string' ? movie.first_air_date.slice(0, 4) : null)
                                                }
                                            </span>
                                                <span className='text-[#a2a3a5] text-[9px]' >•</span>
                                                {movie.genre_ids.slice(0, 2).map(genre_id => {
                                                    return (
                                                        <div className='flex gap-1 text-[8px]'>
                                                            <span className='text-[#d9d9da]'>{index<5 || inputRef.current.value==='' ?movie_genres[genre_id]:tv_genres[genre_id]}</span>
                                                            <span className='text-[#a2a3a5]' >•</span>
                                                        </div>
                                                    )
                                                })}
                                                <div className='flex justify-center items-center text-[#d9d9da] gap-1' >
                                                    <img loading='lazy' src="/images/star.png" alt="" className='w-2 h-2'/>
                                                    <span className='text-[8px]' >{movie.vote_average && (movie.vote_average).toString().slice(0,3)}</span>
                                                </div>
                                            </div>
                                            <p className='text-[#7c849b] text-[7px] flex-grow-0 flex-shrink-0 w-full' >{movie.overview.split(' ').slice(0,22).join(' ')}</p>
                                        </div>
                                    </div>
                                </Link>
                        ) : null
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Search;
