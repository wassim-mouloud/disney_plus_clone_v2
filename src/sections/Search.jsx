import React, { useEffect, useState } from 'react'
import { tv_genres } from '../utils/genres'

function Search() {

    const [popular, setPopular]= useState([])
    const [hoveredMovieId, setHoveredMovieId] = useState(null)


    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
            }
          };
          
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setPopular(response.results))
            .catch(err => console.error(err));
    },[])
    const handleMouseEnter = (id) => {
        setHoveredMovieId(id)
    }
  
    const handleMouseLeave = () => {
        setHoveredMovieId(null)
    }

  return (
    <div className='w-screen' >
        <div className='w-[90%] lg:w-[80%] flex items-center gap-2 bg-[#262833] mt-5 mx-auto rounded-[7px] p-4' >
            <img src="./images/search.png" alt="" className='w-6 h-6 lg:w-8 lg:h-8' />
            <input type="text" placeholder='Movies, shows and more' className='w-[100%] h-[40px] rounded-[7px] bg-[#262833] outline-none text-white text-[14px] lg:text-[18px]'/>
        </div>
        <p className='text-white w-[90%] lg:w-[80%] mx-auto text-[20px] font-semibold py-4' >Popular searches</p>

        <div className='w-[90%] lg:w-[80%] my-grid  mx-auto ' >
            {popular.map((movie, index)=>{
                return(
                    <div key={index} className='rounded-[7px]' >
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className=' rounded-[5px] lg:h-[245px] w-full  '/>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default Search