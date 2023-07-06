import React, { useEffect, useState } from 'react'
import { front } from '../utils/frontMovies'
import GenreSlider from '../components/GenreSlider'
import Navbar from '../components/Navbar'
import {useParams} from 'react-router-dom'

function MovieDetail() {

    const {id}= useParams();
    const [movie, setMovie]= useState({})
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(response => setMovie(response))
            .catch(err => console.error(err));
    },[])


  return (
    <div>
        <Navbar/>
        <div className='w-screen relative text-[#d9d9da]' >
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" className='h-[40%] lg:h-[70vh] object-cover lg:object-top w-full rounded-lg' />
            <div 
                    className="absolute inset-0 w-screen h-[40%] lg:h-[70vh] hidden lg:block" 
                    style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #0f1013)' }}
            >
            </div>
            <div className='lg:absolute lg:top-[12%] lg:ml-[100px] lg:max-w-[450px]' >
                {movie.production_companies && (
                    <img src={`https://image.tmdb.org/t/p/original${movie.production_companies[0].logo_path}`} alt="" className='hidden lg:block  h-[70px] px-3' />

                )}
                <p className='px-3 py-4 font-bold text-[22px] lg:text-[30px] text-[#d9d9da] lg:text-white' >{movie.original_title}</p>
                <div className='flex items-center gap-2 lg:gap-4 px-3 py-1 text-[14px] font-medium text-[#e5e5e5]' >
                    <span className='' >{typeof(movie.release_date)==='string' && movie.release_date.slice(0,4)}</span>
                    <span>•</span>
                    <span>{Math.floor(movie.runtime/60)} h {(movie.runtime%60)} m</span>
                    <span>•</span>
                    <div className='bg-[#5b5b5d] lg:bg-[rgba(0,0,0,0.2)] text-[#e5e5e5]  rounded-md p-1 text-[14px]' >13+</div>
                </div>
                <p className='text-[#7c849b] lg:text-white px-3 text-[14px] font-semibold py-3' >{movie.overview}</p>
                <div className='flex gap-1 py-2 ml-3 ' >
                    {movie.genres && movie.genres.map((genre, index)=>{
                        return(
                            <div key={index} className='flex flex-shrink-0 gap-1 overflow-x-scroll text-[14px] font-medium' >
                                <span className=' text-[#e5e5e5] '>{genre.name}</span>
                                <span className={`text-[#7c849b] ${index===movie.genres.length-1?'hidden':'flex'}`} >|</span>
                            </div>
                        )
                    })}
                </div>
        </div>
        <GenreSlider  title='More like this' url1='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_companies=420' url2='https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_companies=420'/>

    </div>
    </div>

  )
}

export default MovieDetail