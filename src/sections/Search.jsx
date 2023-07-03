import React, { useEffect, useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { tv_genres } from '../utils/genres';
import Navbar from '../components/Navbar';

function Search() {
    const [popular, setPopular]= useState([]);
    const [content, setContent]= useState([]);
    const [searchedMovies, setSearchedMovies]= useState([]);
    const [searchedSeries, setSearchedSeries]= useState([]);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [title, setTitle]= useState('Popular Searches')
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setPopular(response.results))
            .catch(err => console.error(err));
    }, []);
    
    useEffect(() => setContent(popular), [popular]);

    const handleMouseEnter = (id) => {
        setHoveredMovieId(id)
    }
  
    const handleMouseLeave = () => {
        setHoveredMovieId(null)
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
       <div>
            <Navbar/>
            <div className='w-screen' >
            <div className='w-[90%] lg:w-[80%] flex items-center gap-2 bg-[#262833] mt-5 mx-auto rounded-[7px] p-4' >
                <img src="./images/search.png" alt="" className='w-6 h-6 lg:w-8 lg:h-8' />
                <input onChange={handleChange} type="text" placeholder='Movies, shows and more' className='w-[100%] h-[40px] rounded-[7px] bg-[#262833] outline-none text-white text-[14px] lg:text-[18px]'/>
            </div>
            <p className='text-white w-[90%] lg:w-[80%] mx-auto text-[20px] font-semibold py-4' >{title}</p>

            <motion.div layout className='w-[90%] lg:w-[80%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2  mx-auto ' >
                <AnimatePresence>
                    {content.map((movie, index) => 
                        movie.poster_path ? (
                            <motion.div
                                key={index}
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                exit={{opacity:0}}
                                layout
                                className='rounded-[7px] bg-[#262833] '
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt=""
                                    className=' rounded-[5px] h-[190px] md:h-[220px] lg:h-[245px] w-full  '
                                />
                            </motion.div>
                        ) : null
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
       </div>
    )
}

export default Search;
