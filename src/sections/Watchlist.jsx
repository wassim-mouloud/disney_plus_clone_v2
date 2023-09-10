import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getDocs, collection, deleteDoc } from 'firebase/firestore'
import { db} from '../config/firebase'
import WatchlistCard from '../components/WatchlistCard'

function Watchlist({watchlistMovies, setWatchlistMovies, watchlistSeries, setWatchlistSeries, allWatchlist, setAllWatchlist}) {

    const movieCollectionRef = collection(db, 'watchlist_movies')
    const seriesCollectionRef = collection(db, 'watchlist_series')



    useEffect(()=>{
        const getMovies = async ()=>{
            try{
                const data= await getDocs(movieCollectionRef)
                const filteredData = data.docs.map((doc) => (
                    {
                        ...doc.data(),
                        id : doc.id
                    }
                ) )
                setWatchlistMovies(filteredData)
            } catch(e){
                console.error(e)
            }
        }
        getMovies()
    }, [])

    useEffect(()=>{
        const getSeries = async ()=>{
            try{
                const data= await getDocs(seriesCollectionRef)
                const filteredData = data.docs.map((doc) => (
                    {
                        ...doc.data(),
                        id : doc.id
                    }
                ) )
                setWatchlistSeries(filteredData)
            } catch(e){
                console.error(e)
            }
        }
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
                    <WatchlistCard movie={movie} index={index}  setWatchlistMovies={setWatchlistMovies} setWatchlistSeries={setWatchlistSeries} />
                )
            })}
        </div>
    </div>
  )
}

export default Watchlist