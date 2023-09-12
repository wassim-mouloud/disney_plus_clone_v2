import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import WatchlistCard from '../components/WatchlistCard'

function Watchlist({watchlistMovies, watchlistSeries, allWatchlist, setAllWatchlist, getMovies, getSeries, hovered, hoveredMovieId, handleMouseEnter, handleMouseLeave}) {

    useEffect(()=>{
        getMovies()
    }, [])

    useEffect(()=>{
        getSeries()
    }, [])

    useEffect(()=>{
        setAllWatchlist([...watchlistMovies, ...watchlistSeries])
    }, [watchlistMovies, watchlistSeries])

  return (
    <div>
        <Navbar/>
        <p className='text-white  text-[20px] lg:text-[28px] font-bold p-6 lg:p-8 lg:pl-[100px]' >My watchlist</p>
        <div  className='w-screen lg:w-[calc(100vw-100px)] xl:w-[calc(100vw-140px)] grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2  mb-[120px] lg:mb-0 p-6 lg:p-8 lg:pl-[100px]' >
            {allWatchlist.map((movie, index)=>{
                return(
                    <WatchlistCard movie={movie} index={index}  getMovies={getMovies} getSeries={getSeries} hovered={hovered}  hoveredMovieId={hoveredMovieId}  handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                )
            })}
        </div>
    </div>
  )
}

export default Watchlist