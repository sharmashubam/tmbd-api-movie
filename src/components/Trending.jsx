import React, { useEffect } from 'react'
import { useContext } from 'react';
import requests, { Context } from '../Context';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Trending = () => {
    const { movies,setMovies,page,setDetail} = useContext(Context)
    const key= 'cd044f6d93442c21362eeb8daf590a27'
    const requestPopular= `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${page}`;
     
    useEffect(() => {
        axios.get(requestPopular).then((response) => {
            setMovies(response.data.results);
        });
    }, [page]);
    
    
    return (
        <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 mx-2 lg:mx-32 lg:gap-6 md:mx-16 z-0">
            {movies?.map(function (movie, id) {
                return (
                    <Link onClick={()=>{setDetail(movie)}}
                    to='/detail' key={movie.id} className='text-white text-center items-center mt-8'>
                        <img 
                            className='w-[240px] rounded-sm shadow-2xl h-[370px] mx-auto object-cover cursor-pointer transition duration-380 ease-in-out hover:opacity-80 border-2 hover:border-teal-200 border-teal-500'
                            src={movie?`https://image.tmdb.org/t/p/original/${movie.poster_path}`:'https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc'}
                            alt={movie?.title}
                        />
                        <div className='mt-3'>
                            <h2 className='font-semibold cursor-pointer'>{movie?.title.length > 10 ? movie.title.slice(0, 21) + ".." : movie?.title}</h2>
                            <p className='text-gray-400 text-sm'>
                                Released: {movie?.release_date}
                            </p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Trending