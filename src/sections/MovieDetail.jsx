import React from 'react'
import { front } from '../utils/frontMovies'
import GenreSlider from '../components/GenreSlider'
import Navbar from '../components/Navbar'
function MovieDetail() {
  return (
    <div>
        <Navbar/>
        <div className='w-screen relative text-[#d9d9da]' >
            <img src={`https://image.tmdb.org/t/p/original${front[0].backdrop_path}`} alt="" className='h-[40%] lg:h-[70vh] object-cover lg:object-top w-full rounded-lg' />
            <div 
                    className="absolute inset-0 w-screen h-[40%] lg:h-[70vh] hidden lg:block" 
                    style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #0f1013)' }}
            >
            </div>
            <div className='lg:absolute lg:top-[12%] lg:ml-[100px] lg:max-w-[450px]' >
                <p className='px-3 py-4 font-bold text-[22px] lg:text-[30px] text-[#d9d9da] lg:text-white' >{front[0].original_title}</p>
                <div className='flex items-center gap-2 lg:gap-4 px-3 py-1 text-[14px] font-medium text-[#e5e5e5]' >
                    <span className='' >{front[0].release_date.slice(0,4)}</span>
                    <span>•</span>
                    <span>{Math.floor(front[0].runtime/60)} h {(front[0].runtime%60)} m</span>
                    <span>•</span>
                    <div className='bg-[#5b5b5d] lg:bg-[rgba(0,0,0,0.2)] text-[#e5e5e5]  rounded-md p-1 text-[14px]' >13+</div>
                </div>
                <p className='text-[#7c849b] lg:text-white px-3 text-[14px] font-semibold py-3' >{front[0].overview}</p>
                <div className='flex gap-1 py-2 ml-3 ' >
                    {front[0].genres.map((genre, index)=>{
                        return(
                            <div key={index} className='flex flex-shrink-0 gap-1 overflow-x-scroll text-[14px] font-medium' >
                                <span className=' text-[#e5e5e5] '>{genre.name}</span>
                                <span className={`text-[#7c849b] ${index===front[0].genres.length-1?'hidden':'flex'}`} >|</span>
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