import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '../App.css';

function Navbar() {
    const [active, setActive] = useState("Home")

    return (
        <div className='group w-screen lg:hover:w-[20vw] lg:w-[80px] h-[100px] lg:h-screen fixed bottom-0 lg:top-0 lg:left-0 z-[99] bg-[#0f1013] lg:bg-transparent transition-[width] duration-500' style={{ backgroundImage: `linear-gradient(to right, #0f1013 , transparent)` }}>
            <div className='w-full h-[0.5px] lg:hidden bg-[#94a3b8]' />
            <div 
                className="flex items-center justify-center w-full h-full p-4 text-white lg:flex-col lg:items-start lg:gap-6 "
                >

                <div  
                    className={`cursor-pointer lg:hover:scale-[1.15] transition-transform duration-300 lg:ml-[30px] h-[50px] flex flex-col gap-3 lg:flex-row items-center ml-[50px]`}
                    onClick={() => setActive("My space")}>
                    <img 
                        src={`./images/daredevil.jpeg`} 
                        alt="" 
                        className={`h-[20px] w-[20px] min-w-[20px] object-cover rounded-full`} 
                    />
                    <span 
                        className={`hover:text-white lg:opacity-0 lg:-translate-x-[70%] lg:group-hover:translate-x-3 lg:group-hover:opacity-100 transition-transform duration-500 ${active === "My space" ? 'text-white' : 'text-[#C3C3C3]'} text-[12px] lg:text-[18px]`}
                    >
                        Profile
                    </span>
                </div>

                {['Home', 'Search', "Movies", "Series"].map((item, i) => (
                    <Link key={i} to={`${item!=='Home'?`/${item}`:'/'}`} className='ml-[50px] lg:ml-0 last:ml-0'> 
                        <div
                            key={item}
                            className={`${active === item ? 'text-white' : 'text-[#C3C3C3]'} hover:text-white lg:hover:scale-[1.15] transition-transform duration-300 ${item==="Movies" || item==="Series"?"hidden  lg:flex" :'' } lg:ml-[30px] cursor-pointer h-[50px] flex flex-col gap-3 lg:flex-row items-center flex-shrink-0`}
                            onClick={() => setActive(item)}
                        >
                            <img
                                src={`./images/${active === item ? "white_" + item.toLowerCase() + ".png" : "gray_" + item.toLowerCase() + ".png"}`}
                                alt=""
                                className={`h-[20px] min-w-[20px] w-[20px] flex-shrink-0 object-cover`}
                            />
                            <span
                                className={`lg:-translate-x-[70%] lg:opacity-0 flex-shrink-0 lg:group-hover:translate-x-3 lg:group-hover:opacity-100 transition-transform duration-500 text-[12px] lg:text-[18px]`}
                            >
                                {item}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Navbar
