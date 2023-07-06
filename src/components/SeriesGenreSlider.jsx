import React, { useEffect, useState } from 'react'
import MainSlider from './MainSlider';
import SeriesSlider from './SeriesSlider'


function SeriesGenreSlider({title, url1, url2}) {
    const [trending, setTrending]= useState([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWIyOTk3YzgzMDBjZTlhN2Q0NzJjYjBhMzljZjI4ZiIsInN1YiI6IjYzNWFiODU0MmQ4ZWYzMDA4MTM5YmQ4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9uqLs8oCBNUguiDI0vyPoXyrmksjpVbHnZKtHnJObG0'
        }
      };

      useEffect(()=>{
        async function getTrending(){
            try{
                const response= await fetch(url1, options)
                const json= await response.json()
                setTrending(json.results)
                const response2= await fetch(url2, options)
                const json2= await response2.json()
                setTrending(prev=>[...prev, json2.results[8]])
                setTrending(prev=>[...prev].slice(0,21))
            }catch(e){
                console.error(e)
            }
        }

        getTrending()
      },[])
  return (
    <div className=' flex flex-col gap-1 ml-3 lg:ml-[100px] mt-10  lg:w-[calc(100vw-100px)] ' >
        <p className=' text-white font-semibold text-[20px]' >{title}</p>
        <SeriesSlider trending={trending} />
    </div>
  )
}

export default SeriesGenreSlider