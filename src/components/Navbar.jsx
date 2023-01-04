import React, { useEffect } from 'react'
import { useContext } from 'react';
import axios from 'axios'
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { Context } from '../Context';
import { Link, Route } from 'react-router-dom';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const history = useNavigate();
    const { setPage, search, setSearch } = useContext(Context)
   
    const [se, setSe] = useState('');
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav);
    };

    const pageHandler = () => {
        setPage(1);
        setSearch(se)
        setNav(!nav)
    }

    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            // Navigate to a route using the Link component
            // history navigtion
            history("/search");
            setSearch(se)
            setPage(1);
            setNav(!nav)
        }
    };
    return (
        <div className="flex justify-between items-center h-[70px] shadow-2xl rounded-2xl md:h-[80px] mx-auto px-4 z-50 text-white fixed top-0 w-full  bg-[#232121]">
            <Link to='/' onClick={()=>{setPage(1)}} className="text-2xl font-bold xl:ml-32 xl:px-2 md:ml-4 ml-4 text-[#00df9a]">getMovie</Link>

            <div className="z-50 hidden xl:flex items-center">
                <Link to='/' onClick={pageHandler} className="px-4 py-1 font-semibold rounded-md hover:text-teal-500 cursor-pointer">Home</Link>
                <Link to='/upcoming' onClick={pageHandler} className="px-4 py-1 font-semibold rounded-md hover:text-teal-500 cursor-pointer">Upcoming</Link>
                <Link to='/trending' onClick={pageHandler} className="px-4 py-1 font-semibold rounded-md hover:text-teal-500 cursor-pointer w-fit">Playing</Link>
                <Link to='/saved' className="px-4 py-1 font-semibold rounded-md hover:text-teal-500 cursor-pointer">Bookmarks</Link>

                <div className="flex items-center border-b-2 border-teal-500 py-2 mx-2 md:w-[35%] xl:w-[100%] w-[100%]">
                    <input onChange={(e) => { setSe(e.target.value) }} onKeyDown={handleKeyPress} className="appearance-none bg-transparent border-none  text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search movies" />
                    <Link to='/search' onClick={pageHandler} className="flex bg-teal-500 xl:block md:hidden hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                        Search
                    </Link>
                </div>
                <div className="flex justify-between items-center p-2 text-white sm:px-6 lg:px-8 shadow-md bg-red-500-500">
                    <div className="flex items-center">
                        <BsFillBrightnessHighFill className="h-4 w-4 cursor-pointer hover:text-teal-700 text-teal-500 fill-current sm:h-6 sm:w-6 lg:h-6 lg:w-6" />
                    </div>
                </div>
            </div>


            <div onClick={handleNav} className='block  xl:hidden cursor-pointer z-50'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            <div className={nav
                ? 'xl:hidden fixed left-0 top-0  shadow-2xl rounded-2xl z-40 flex flex-col items-center justify-between w-full h-fit bg-[#232121] ease-in-out duration-500 ' :
                'fixed left-[-100%] top-0 h-fit justify-between shadow-2xl rounded-2xl z-40 flex flex-col items-center w-full bg-[#232121] ease-in-out duration-500'} >

                <h1 className="p-4 md:mt-2 w-full text-center rounded-2xl border border-[#2d2d2d] shadow-2xl text-2xl font-bold text-teal-500 sm:px-6 lg:px-8 bg-red-500-500">
                    Let's getMovies
                </h1>

                <div className='flex flex-col gap-2 w-full'>
                    <div className="flex justify-center items-center w-full gap-2 shadow-2xl rounded-2xl  font-semibold mt-2 p-2">
                        <BsFillBrightnessHighFill className="h-4 w-4 cursor-pointer hover:text-teal-700 text-teal-500 fill-current sm:h-4 sm:w-4 lg:h-6 lg:w-6 " />
                        <div>Theme</div>
                    </div>

                    <Link to='/' onClick={pageHandler} className="p-2 font-semibold text-center shadow-2xl rounded-2xl mt-2 hover:text-teal-500 cursor-pointer">Home</Link>
                    <Link to='/upcoming' onClick={pageHandler} className="p-2 font-semibold text-center shadow-2xl rounded-2xl mt-2 hover:text-teal-500 cursor-pointer">Upcoming</Link>
                    <Link to='/trending' onClick={pageHandler} className="p-2 font-semibold text-center shadow-2xl rounded-2xl mt-2 hover:text-teal-500 cursor-pointer">Trending</Link>
                    <Link to='/saved' className="p-2 font-semibold text-center shadow-2xl rounded-2xl mt-2 hover:text-teal-500 cursor-pointer">Saved</Link>
                </div>

                <div className="flex flex-col items-start w-full my-4">
                    <input onChange={(e) => { setSe(e.target.value) }} onKeyDown={handleKeyPress} className="appearance-none text-center border-teal-500 border w-[80%] md:w-[50%] mx-auto py-3 rounded-2xl shadow-2xl bg-transparent  text-gray-200 leading-tight focus:outline-none" type="text" placeholder="Search movies" />
                    <Link to='/search' onClick={pageHandler} className=" mx-auto m-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm  border-4 text-white py-1 px-6 rounded" type="button">
                        Search
                    </Link>
                </div>

            </div>


        </div>


    )
}

export default Navbar