import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function Hero({ frontMovies }) {
    const [index, setIndex] = useState(0);
    const scrollDots = useRef(null);
    const [slider, setSlider] = useState([
        0,1,2,3,4,5,6,7,8,9,
        10,11,12,13,14,15,16,17
    ]);
    const sliderRef= useRef(null)
    const viewers=[0,1,2,3,4,5]
    const [trailers, setTrailers]= useState([])

    

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % 18);
        }, 6000);

        // Clean up the interval on unmount
        return () => clearInterval(timer);
    }, [frontMovies]);

    useEffect(() => {
        if(sliderRef.current) {
            if(index % 5 === 4) { // for every fourth element
                scrollDots.current.scrollLeft += 66
            } else if (index === 18) {
                setTimeout(() => { 
                    scrollDots.current.scrollLeft = 0 
                }, 6000);
            }
        }
    }, [index]);
    
    


    const handlePrevious= ()=> {
        const sliderIndex=parseInt(getComputedStyle(sliderRef.current).getPropertyValue("--slider-index"))
        if(sliderIndex===0){
            sliderRef.current.style.setProperty("--slider-index", 2);
        }else{
            sliderRef.current.style.setProperty("--slider-index", sliderIndex-1);
        }
    }
    const handleNext= ()=> {
        const sliderIndex=parseInt(getComputedStyle(sliderRef.current).getPropertyValue("--slider-index"))

        if(sliderIndex===2){
            sliderRef.current.style.setProperty("--slider-index", 0);
        }else{
            sliderRef.current.style.setProperty("--slider-index", sliderIndex+1);
        }
    }

    useEffect(() => {
        if(sliderRef.current) { 
    
            if(index % 6 === 5 && index!==0){
                setTimeout(()=>handleNext(),6000)
            }
        }
    }, [index]);
    
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
            }
          };
          
          frontMovies.forEach(movie=>{
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, options)
                .then(response => response.json())
                .then(response => {
                    for (let video of response.results){
                        if(video.type==="Trailer" ){
                            setTrailers(prevTrailers => [...prevTrailers, video.key]);
                            break
                        }
                    }
          })
          .catch(err => console.error(err));
          })
      
    }, [frontMovies])
        
       

    return (
        <div className='w-screen h-[50vh] lg:h-screen relative'>
            <div 
                className="absolute inset-0 w-screen h-[51vh] lg:h-screen" 
                style={{ backgroundImage: 'linear-gradient(to bottom, transparent, #0f1013)', zIndex: 40 }}
            >
            </div>

            {frontMovies[index] && 
                <div className='w-full h-full '>
                    <div className='flex calc justify-center lg:justify-between absolute top-[40%] lg:top-[20%] lg:left-[140px]'>
                        <div 
                            key={frontMovies[index].original_title} 
                            className=' w-screen lg:w-[30vw] h-[35vh] lg:h-[60vh]  flex flex-col justify-center gap-6 lg:gap-0  lg:justify-between items-center lg:items-start' >
                       
                            <img src="./images/logo.png" alt="" className='w-full z-[90] hidden lg:flex' />

                            <p className='text-white text-[24px] lg:text-[30px] font-bold z-[90] text-center lg:text-left'>
                                {frontMovies[index].original_title}
                            </p>

                            <div className='hidden lg:flex h-6  items-center justify-center gap-2 text-white text-[14px] z-[90]' >
                                <span>{frontMovies[index].release_date.slice(0,4)}</span>
                                <span className=''>•</span>
                                <span>{Math.floor(frontMovies[index].runtime/60)} h {(frontMovies[index].runtime%60)} m</span>
                                <img src="./images/star.png" alt="" className='w-3 h-3' />
                                <span>{(frontMovies[index].vote_average).toString().slice(0,3)}</span>
                            </div>

                            <p className='font-semibold text-white text-[14px] hidden lg:flex z-[90]'>
                                {frontMovies[index].overview}
                            </p>

                            <div className='flex gap-2 text-white text-[14px] z-[90]'>
                                <span className='lg:hidden' >{frontMovies[index].release_date.slice(0,4)}</span>
                                <span className='lg:hidden'>•</span>
                                {frontMovies[index].genres.map((genre, i) => {
                                    return (
                                        <div className={`${i > 3 ? "hidden" : ''} flex gap-2  z-[90]`}>
                                            <span>{genre.name}</span>
                                            {i !== frontMovies[index].genres.length - 1?<div><span className='lg:hidden' >•</span> <span className='hidden lg:flex' >|</span></div>:null }
                                        </div>
                                    );
                                })}
                            </div>

                            <div className='py-3 flex gap-6 w-full justify-center lg:justify-between  text-white z-[90]'>
                                <a className='p-0 m-0 w-[170px] lg:w-[70%] h-[50px] lg:h-[55px] lg:min-w-[70%]' href={`https://www.youtube.com/watch?v=${trailers[index]}`} target="_blank" rel="noopener noreferrer">
                                    <button
                                        className={`w-full h-full rounded-[10px] text-[14px]  bg-[rgba(255,255,255,0.2)] lg:hover:bg-[rgba(255,255,255,0.4)] lg:hover:scale-105 transition-all duration-300  p-5 flex justify-center items-center gap-2`}
                                    >
                                        <img src="./images/play_button.png" alt="" className='h-[16px] w-[16px]' />
                                        <span>Watch Now</span>
                                    </button>
                                </a>

                                <button 
                                    className='w-[50px] lg:w-[60px] h-[50px] lg:h-[55px] rounded-[10px] text-[18px]  bg-[rgba(255,255,255,0.2)] lg:hover:bg-[rgba(255,255,255,0.4)] lg:hover:scale-105 transition-all duration-300 p-5 flex justify-center items-center'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className='relative w-[640px]  z-[90]  flex-shrink-0  hidden lg:flex  items-end justify-center overflow-x-hidden py-3 px-[30px]' >
                            <div ref={sliderRef}  className={`flex w-[580px] min-w-[580px] gap-2 slider  flex-shrink-0 `} >
                               
                            
                                {slider.map(n=>{
                                    return (
                                        <div 
                                            onClick={()=>setIndex(n)} 
                                            className={`overflow-hidden flex-shrink-0 calc-child-slider rounded-[5px] hover:scale-110  transition-all  duration-150 cursor-pointer border-transparent hover:border-white border-[1px] ${index===n?"border-white":''}`} >

                                            <img src={`https://image.tmdb.org/t/p/original${frontMovies[n].backdrop_path}`} alt="" className={`h-full w-full `} />
                                        </div>
                                    )
                                })}
                            </div>

                            <div 
                                className='absolute left-0 bottom-[12px] h-[50px] w-[25px] flex justify-center items-center  rounded-l-[10px] cursor-pointer hover:scale-125' 
                            >
                                <img onClick={handlePrevious} src="./images/previous.png" alt="" className=' w-8 h-8 z-[91]' />
                            </div>

                            <div 
                                onClick={handleNext} 
                                className='absolute right-0 bottom-[12px] h-[50px] w-[25px] flex justify-center items-center  transition-all rounded-l-[10px] cursor-pointer hover:scale-125' 
                            >
                                <img src="./images/previous.png" alt="" className=' w-8 h-8 z-[91] rotatey' />
                            </div>
                        </div>
                    </div>

                    <img 
                        key={frontMovies[index].backdrop_path} 
                        src={`https://image.tmdb.org/t/p/original${frontMovies[index].backdrop_path}`} 
                        alt="" 
                        className='relative object-cover w-full h-full fade-in'
                    />
                </div>
            }

            <div ref={scrollDots} className='flex gap-2 overflow-x-scroll w-[80px] mx-auto mt-4 scrollbar-hide'>
                {frontMovies && frontMovies.map((movie, i) => {
                    return <div 
                        key={i} 
                        className={`lg:hidden h-[8px] w-[8px]  rounded-full  flex-shrink-0 ${index === i ? "bg-white opacity-100 scale-105" : 'bg-[#c3c3c3] opacity-40 '}`} 
                    />;
                })}
            </div>
            <div className='flex justify-center w-screen mt-7 lg:absolute bottom-4 z-[90]' >
                <div className='w-[95vw] lg:w-[90vw] flex justify-between gap-1 lg:gap-2 flex-wrap lg:flex-nowrap' >
                        {viewers.map((viewer, index) => {
                            return (
                                <div 
                                    className={`bg-[#1b1d25] group cursor-pointer overflow-hidden relative w-[calc(95vw/3-4px)] lg:w-[calc(90vw/6-8px)] h-[75px] lg:h-[120px] rounded-[5px]  flex justify-center items-center lg:hover:scale-[1.15] duration-300 transition-transform hover:z-[99]`}
                                    key={index} 
                                >
                                    <img src={`./images/viewer${index}.png`} alt="" className='h-[70px] z-[99] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                                    <video 
                                
                                    src={`./videos/viewer${index}.mp4`}  
                                    autoPlay
                                    muted 
                                    loop 
                                    className='object-cover w-full z-[90] h-full min-w-full min-h-full transition-opacity duration-300 opacity-0 group-hover:opacity-100'
                                    />

                                </div>
                        )
                        })}
                </div>
            </div>
        </div>
    );
}

export default Hero;
