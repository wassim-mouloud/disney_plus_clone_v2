import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getDocs, collection, deleteDoc } from 'firebase/firestore'
import { db} from '../config/firebase'
import WatchlistCard from '../components/WatchlistCard'

function Watchlist() {

    const movieCollectionRef = collection(db, 'watchlist_movies')
    const [movies, setMovies] = useState([])
    const seriesCollectionRef = collection(db, 'watchlist_series')
    const [series, setSeries] = useState([])
    const [allWatchlist, setAllWatchlist] = useState([])


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
                setMovies(filteredData)
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
                setSeries(filteredData)
            } catch(e){
                console.error(e)
            }
        }
        getSeries()
    }, [])

    useEffect(()=>{
        setAllWatchlist([...movies, ...series])
    }, [movies, series])




  return (
    <div>
        <Navbar/>
        <p className='text-white  text-[20px] lg:text-[28px] font-bold p-6 lg:w-[80%] mx-auto mt-5' >My watchlist</p>
        <div  className='w-screen lg:w-[80%] grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-2 mx-auto mb-[120px] lg:mb-0 p-6' >
            {allWatchlist.map((movie, index)=>{
                return(
                    <WatchlistCard movie={movie} index={index} id={movie.id} setMovies={setMovies} setSeries={setSeries} />
                )
            })}
        </div>
    </div>
  )
}

export default Watchlist