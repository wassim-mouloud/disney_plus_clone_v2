import React, { useEffect, useRef, useState } from 'react'
import { movie_genres, tv_genres } from '../utils/genres'

function MainSlider({ trending }) {
    
  const sliderRef = useRef(null)
  const [index, setIndex] = useState(1)
  const [first, setFirst] = useState([])
  const [last, setLast] = useState([])  
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
 

  useEffect(() => {
    if (trending.length > 0) {
        setFirst(trending.slice(0, 8))
        setLast(trending.slice(14, 21))

        // Preload backdrop images
        trending.forEach(movie => {
            const img = new Image();
            img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
        });
    }
  }, [trending])

  const handleNext = () => {  
      if(index >= 4) return
      let size = sliderRef.current.offsetWidth;
      let newIndex = index + 1;
      sliderRef.current.style.transition = 'transform 0.3s linear';
      setIndex(newIndex);
      sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
  }

  const handlePrev = () => {
      if(index <= 0) return
      let size = sliderRef.current.offsetWidth;
      let newIndex = index - 1;
      sliderRef.current.style.transition = 'transform 0.3s linear';
      setIndex(newIndex);
      sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
  }

  const handleTransitionEnd = () => {
      if(index === 0){
          let size = sliderRef.current.offsetWidth;
          let newIndex = 3;
          sliderRef.current.style.transition = 'none';
          setIndex(newIndex);
          sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
      } else if(index === 4){
          let size = sliderRef.current.offsetWidth;
          let newIndex = 1;
          sliderRef.current.style.transition = 'none';
          setIndex(newIndex);
          sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
      }
  }

  const handleMouseEnter = (id) => {
      setHoveredMovieId(id)
  }

  const handleMouseLeave = () => {
      setHoveredMovieId(null)
  }

  return (
    <div className='z-[90] py-2 relative w-screen  mt-3  lg:w-[calc(100vw-100px)] overflow-x-clip'>
        <div onClick={handlePrev} className=' cursor-pointer h-full w-[50px] hidden lg:flex opacity-0 hover:opacity-100 transition-opacity duration-500 justify-center items-center absolute left-0 top-0 z-[99]' style={{ backgroundImage: 'linear-gradient(to left, transparent, #0f1013)' }} >
            <img src="./images/previousMain.png" alt="" className='w-4 h-4 z-[99]'  />
        </div>
        <div onTransitionEnd={handleTransitionEnd}  ref={sliderRef} className='flex w-full gap-2 lg:w-[95%] translate-x-0 lg:translate-x-[-100%] overflow-x-scroll lg:overflow-visible' >
            {last.map(movie => {
                return (
                    <div className=' h-[170px] cursor-pointer lg:h-[250px] lg:min-h-[250px] lg:w-[calc(100%/7-8px)] flex-shrink-0 rounded-[5px]' >
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className={`group-hover:h-[45%] object-bottom  rounded-[5px] h-full w-full`}/>
                    </div>
                )
            })}
            {trending.map((movie, index) => {
                return (
                    <div onMouseEnter={() => handleMouseEnter(movie.id)} onMouseLeave={handleMouseLeave} className={`group   lg:hover:scale-x-[1.8] lg:hover:scale-y-[1.5] bg-[#16181f] text-white cursor-pointer lg:hover:z-[99] transition-transform duration-500 h-[170px] lg:h-[250px] lg:min-h-[250px] lg:w-[calc(100%/7-8px)] flex-shrink-0 rounded-[5px] ${index%7 === 0 ? "origin-left" : ''}`} >
                           <div 
                                className={`absolute inset-0 w-full lg:h-[45%] ${hoveredMovieId === movie.id ?'lg:flex':'hidden'}`} 
                                style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #16181f)', zIndex: 99 }}
                            />

                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className={` group-hover:h-[45%] object-bottom lg:group-hover:object-top lg:group-hover:object-cover  rounded-[5px] h-full w-full`}/>
                        <div className='flex-col items-center hidden w-full gap-2 mt-3 lg:group-hover:flex' >
                            <div className='flex gap-2 w-[95%]' >
                                <button className='text-[8px] h-[30px] w-[135px] flex justify-center items-center gap-1 bg-[#d9d9da] rounded-[5px]' >
                                    <img src="./images/dark-blue-play.png" alt="" className='w-2 h-2'/>
                                    <span className='font-medium text-[#16181f]' >Watch Now</span>
                                </button>
                                <button className='text-[8px] h-[30px] w-[30px] flex justify-center items-center bg-[rgba(40,42,49,255)] rounded-[5px] text-white' >+</button>
                            </div>
                            
                            <div className='w-[95%] flex flex-col  gap-1' >
                                <div className='flex gap-1  items-center text-[9px] font-medium ' >
                                    <span className='text-[#d9d9da text-[9px]' >{typeof(movie.release_date)==='string' && movie.release_date.slice(0, 4)}</span>
                                    <span className='text-[#a2a3a5] text-[9px]' >•</span>
                                    {movie.genre_ids.slice(0, 2).map(genre_id => {
                                        return (
                                            <div className='flex gap-1 text-[9px]'>
                                                <span>{movie_genres[genre_id]}</span>
                                                <span className='text-[#a2a3a5]' >•</span>
                                            </div>
                                        )
                                    })}
                                    <div className='flex justify-center items-center text-[#d9d9da] gap-1' >
                                        <img src="./images/star.png" alt="" className='w-2 h-2'/>
                                        <span>{movie.vote_average}</span>
                                    </div>
                                
                                </div>
                                <p className='text-[#7c849b] text-[7px] flex-grow-0 flex-shrink-0 w-full' >{movie.overview.split(' ').slice(0,28).join(' ')}</p>
                            </div>

                        
                        </div>
                    </div>
                )
            })}
            {first.map(movie => {
                return (
                    <div className=' h-[170px] lg:h-[250px] cursor-pointer lg:min-h-[250px] lg:w-[calc(100%/7-8px)] flex-shrink-0 rounded-[5px]' >
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" className={`group-hover:h-[45%] object-bottom  rounded-[5px] h-full w-full`}/>
                    </div>
                )
            })}
        </div>
        <div onClick={handleNext} className='cursor-pointer h-full w-[50px] hidden lg:flex opacity-0 hover:opacity-100 transition-opacity duration-500 justify-center items-center absolute right-0 top-0' style={{ backgroundImage: 'linear-gradient(to right, transparent, #0f1013)' }}>
            <img src="./images/nextMain.png" alt="" className='w-4 h-4 z-[99]'  />
        </div>
    </div>
  )
}

export default MainSlider
