import React, { useEffect, useRef, useState } from 'react'
import { movie_genres, tv_genres } from '../utils/genres'
import { Link } from 'react-router-dom'
import '../App.css'
function SeriesSlider({ trending }) {
    
  const sliderRef = useRef(null)
  const [index, setIndex] = useState(1)
  const [first, setFirst] = useState([])
  const [last, setLast] = useState([])  
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const [isHovered, setIsHovered]= useState(false)
  const [trailers, setTrailers]= useState([])

 
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(()=>{
    console.log(window.innerWidth)
  },[])

  

  useEffect(() => {
    if (trending.length > 0) {
        if(window.innerWidth>=1536){
            setFirst(trending.slice(0, 8))
            setLast(trending.slice(15, 23))
        }else if(window.innerWidth>=1280){
            setFirst(trending.slice(0, 7))
            setLast(trending.slice(14, 21))
        }else if (window.innerWidth>=1024){
            setFirst(trending.slice(0, 6))
            setLast(trending.slice(12, 18))
        }

    }
  }, [trending])

  const handleNext = () => {  
      if(index >= 4) return
      let size = sliderRef.current.offsetWidth;
      let newIndex = index + 1;
      sliderRef.current.style.transition = 'transform 0.6s linear';
      setIndex(newIndex);
      sliderRef.current.style.transform = 'translateX(' + (-size * newIndex) + 'px)';
  }

  const handlePrev = () => {
      if(index <= 0) return
      let size = sliderRef.current.offsetWidth;
      let newIndex = index - 1;
      sliderRef.current.style.transition = 'transform 0.6s linear';
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

  const handleMouseEnter = async (id) => {
    setHoveredMovieId(id)
    await sleep(500)
    setIsHovered(true)
}

const handleMouseLeave = () => {
    setHoveredMovieId(null)
    setIsHovered(false)
}


useEffect(()=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
      };
      
      const fetchMovieTrailers = async () => {
        for (let movie of trending) {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${movie?.id}/videos?language=en-US`, options);
            const data = await response.json();
            if(data.results[0]){
                setTrailers(prevTrailers => {
                    if (!prevTrailers.includes(data.results[0].key)) {
                      return [...prevTrailers, data.results[0].key];
                    } else {
                      return prevTrailers;
                    }
                  });
            }
          } catch (err) {
            console.error(err);
          }
        }
      };
      
      fetchMovieTrailers();
      
  
}, [trending])

  return (
    <div className='z-[90] py-2 relative w-screen  mt-3  lg:w-[calc(100vw-100px)] overflow-x-clip'>
        <div onClick={handlePrev} className=' cursor-pointer h-full w-[50px] hidden lg:flex opacity-0 hover:opacity-100 transition-opacity duration-500 justify-center items-center absolute left-0 top-0 z-[99]' style={{ backgroundImage: 'linear-gradient(to left, transparent, #0f1013)' }} >
            <img src="/images/previousMain.png" alt="" className='w-4 h-4 z-[99]'  />
        </div>
        <div onTransitionEnd={handleTransitionEnd}  ref={sliderRef} className='flex w-full gap-2 lg:w-[95%] translate-x-0 lg:translate-x-[-100%] overflow-x-scroll lg:overflow-visible' >
            {last.map((movie, index) => {
                return (
                    <div key={index} className=' h-[170px] cursor-pointer lg:h-[250px] lg:min-h-[250px] lg:w-[calc(100%/6-8px)] xl:w-[calc(100%/7-8px)] 2xl:w-[calc(100%/8-8px)] flex-shrink-0 rounded-[5px] hidden lg:flex' >
                        <img loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" className={`group-hover:h-[45%]   rounded-[5px] h-full w-full`}/>
                    </div>
                )
            })}
            {trending.map((movie, index) => {
                return (
                    <Link to={`/SeriesDetail/${movie?.id}`} key={index} onMouseEnter={() => handleMouseEnter(movie?.id)} onMouseLeave={handleMouseLeave} className={`group  ${isHovered && movie?.id===hoveredMovieId ? 'lg:hover:scale-x-[1.7] lg:hover:scale-y-[1.4]': ''}    bg-[#16181f] text-white cursor-pointer lg:hover:z-[99] transition-transform duration-500 h-[170px] lg:h-[250px] lg:min-h-[250px] w-[110px]  lg:w-[calc(100%/6-8px)] xl:w-[calc(100%/7-8px)] 2xl:w-[calc(100%/8-8px)] flex-shrink-0 rounded-[5px] ${index%6===0 && window.innerWidth<1280 ?'origin-left':''} ${index%7 === 0 && window.innerWidth<1536 ? "xl:origin-left" : ''} ${index%8 === 0 ? "2xl:origin-left" : ''} ${index%6  === 5 && index!==0 &&  window.innerWidth<1280 ? "lg:origin-right" : ''} ${index%7  === 6 && index!==0 &&  window.innerWidth<1536 ? "xl:origin-right" : ''} ${index%8  === 7 && index!==0 ? "2xl:origin-right" : ''}`}>

                                <img loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className={`skeleton rounded-[5px] h-full w-full ${isHovered && movie.id===hoveredMovieId?'lg:hidden':''}    `}/>
                                <img loading='lazy' src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt="" className={`skeleton w-full object-cover rounded-[5px] ${isHovered && movie.id===hoveredMovieId?'lg:group-hover:h-[40%] hidden lg:flex ':'hidden'} `}/>
                                <div className={`flex-col items-start justify-between h-[calc(60%-16px)] hidden w-full py-2 px-2 mt-1 ${isHovered && movie?.id===hoveredMovieId?'lg:group-hover:flex':''}`} >
                                    <div className='flex gap-2 2xl:gap-5 w-[95%]' >
                                        <div className='h-[30px] w-[135px]' to={`https://www.youtube.com/watch?v=${trailers[index]}`} target="_blank" rel="noopener noreferrer">
                                            <button 
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation();
                                                window.open(`https://www.youtube.com/watch?v=${trailers[index]}`, '_blank');
                                            }}
                                            className='lg:hover:scale-105 transition-all duration-300 text-[8px] h-full w-full flex justify-center items-center gap-1 bg-[#d9d9da] rounded-[5px]' >
                                                <img src="/images/dark-blue-play.png" alt="" className='w-2 h-2'/>
                                                <span className='font-medium text-[#16181f]' >Watch Now</span>
                                            </button>
                                        </div>
                                        <button className='lg:hover:scale-105 transition-all duration-300 text-[8px] h-[30px] w-[30px] flex justify-center items-center bg-[rgba(40,42,49,255)] rounded-[5px] text-white' >+</button>
                                    </div>
                                    <p className='font-semibold text-[10px] text-[#d9d9da] py-1' >{movie?.name}</p>
                            
                                    <div className='w-[95%] flex flex-col  gap-1' >
                                        <div className='flex gap-1  items-center text-[8px] font-medium  ' >
                                            <span className='text-[#d9d9da text-[8px]' >{typeof(movie?.first_air_date)==='string' && movie?.first_air_date.slice(0, 4)}</span>
                                            <span className='text-[#a2a3a5] text-[8px]' >•</span>
                                            {movie?.genre_ids.slice(0, 2).map((genre_id, index) => {
                                                return (
                                                    <div key={index} className='flex gap-1 text-[8px]'>
                                                        <span>{tv_genres[genre_id]}</span>
                                                        <span className='text-[#a2a3a5]' >•</span>
                                                    </div>
                                                )
                                            })}
                                            <div className='flex  items-center text-[#d9d9da] gap-1' >
                                                <img src="/images/star.png" alt="" className='w-2 h-2 '/>
                                                <span className='text-[8px]' >{movie?.vote_average.toString().slice(0,3)}</span>
                                            </div>
                            
                                        </div>
                                        <p className='text-[#7c849b] text-[7px] flex-grow-0 flex-shrink-0 w-full' >{movie?.overview.split(' ').slice(0,22).join(' ')}</p>
                                    </div>
                        
                            </div>
                    </Link>
                )
            })}
            {first.map((movie, index) => {
                return (
                    <div key={index} className=' h-[170px] lg:h-[250px] cursor-pointer lg:min-h-[250px]  lg:w-[calc(100%/6-8px)] xl:w-[calc(100%/7-8px)] 2xl:w-[calc(100%/8-8px)] flex-shrink-0 rounded-[5px] hidden lg:flex' >
                        <img loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="" className={`group-hover:h-[45%]  rounded-[5px] h-full w-full`}/>
                    </div>
                )
            })}
        </div>
        <div onClick={handleNext} className='cursor-pointer h-full w-[50px] hidden lg:flex opacity-0 hover:opacity-100 transition-opacity duration-500 justify-center items-center absolute right-0 top-0' style={{ backgroundImage: 'linear-gradient(to right, transparent, #0f1013)' }}>
            <img src="/images/nextMain.png" alt="" className='w-4 h-4 z-[99]'  />
        </div>
    </div>
  )
}

export default SeriesSlider
