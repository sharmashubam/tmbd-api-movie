import React from 'react'
import { useContext } from 'react'
import { Context } from '../Context'
import YouTube from 'react-youtube';
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import Error from './Error';
import { useLocation } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";

import DOMPurify from 'dompurify'
import DetailFoot from './DetailFoot';



const Detail = () => {

    const api = 'cd044f6d93442c21362eeb8daf590a27'

    const { detail } = useContext(Context)
    const { pathname } = useLocation();
    var summary = '';
    const [show, setShow] = useState('Show Less')
    const [cast, setCast] = useState(null)
    const [review, setReview] = useState(null)
    const [video, setVideo] = useState('')
    const [play, setPlay] = useState(false)
    const url = `https://api.themoviedb.org/3/movie/${detail?.id}/credits?api_key=${api}`
    const review_url = `https://api.themoviedb.org/3/movie/${detail?.id}/reviews?api_key=${api}`;


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };



    const showHandler = () => {
        if (show == 'Show More') {
            setShow('Show Less')
        }
        if (show == 'Show Less')
            setShow('Show More')
    }

    useEffect(() => {
        if (detail) {
            axios.get(url).then((response) => {
                if (show == 'Show More') {
                    setCast(response.data.cast);

                }
                if (show == 'Show Less') {
                    if (response.data.cast.length > 7) {
                        setCast(response.data.cast.slice(0, 7));
                    } else {
                        setCast(response.data.cast)
                    }
                }
            });

            axios.get(review_url).then((response) => {
                setReview(response.data)
            });

            axios.get(`https://api.themoviedb.org/3/movie/${detail.id}/videos?api_key=${api}&language=en-US`).then((response) => {
                setVideo(response.data?.results.filter(function (e) {
                    return e.type == "Teaser" || "Clip"
                })[0]);

            });
        }

    }, [show]);

    const truncateString = (str, num) => {
        if (str?.length > num) {
            summary = str.slice(0, num) + '...';
        } else {
            summary = str;
        }
    }
    truncateString(detail?.overview, 400)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const playHandler = () => {
        setPlay(true)
    }

    console.log(review)
    return (
        <>
            {detail ?
                <div className='h-screen w-full'>
                    <div className=' deta w-[100%]  text-white'>

                        <img
                            className='w-full h-full object-cover opacity-20'
                            src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
                            alt={detail?.title}
                        />

                        <div className='absolute z-10 bottom-1 p-4 md:p-8 flex justify-center mx-auto '>
                           


                            <img
                                className='w-[280px] hidden md:hidden xl:block  h-[440px] object-cover rounded-lg'
                                src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
                                alt={detail?.title}
                            />
                            <div className='p-2 md:p-6 xl:p-12'>
                                <h1 className=' text-2xl text-gray-50 md:text-5xl md:w-[70%] w-full font-bold mb-6'>{detail?.title}</h1>

                                <p className='text-gray-400 text-lg py-2'>
                                    Released: {detail?.release_date}
                                </p>
                                <div className='flex items-center gap-2'><AiFillStar color='teal-500' size={20} /><span className='items-center'>{detail.vote_average}</span><span className='text-teal-500 ml-2 font-bold'>Votes</span><span>{detail.vote_count}</span></div>
                                <p className='xl:w-[65%] md:w-[80%] w-full text-lg text-gray-200 pt-1'>
                                    {summary}
                                </p>
                                <div className='my-6'>
                                    <button onClick={playHandler} className='border-2 py-3 px-6 hover:bg-teal-700 text-white transition duration-500 ease-in-out transform hover:scale-105'>
                                        <div className='flex items-center gap-1'>
                                            <BsPlayFill size={10} />
                                            <p>Play</p>
                                        </div>
                                    </button>
                                    <button className='border-2 text-white hover:bg-teal-700 border-gray-300 py-3 px-7 ml-4 transition duration-500 ease-in-out transform hover:scale-105'>
                                        Watch Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className='text-teal-500 text-4xl py-16 font-bold mx-32'>Cast</h1>

                    <div className='grid lg:grid-cols-9 md:grid-cols-3 grid-cols-2 lg:gap-6 gap-4 md:mx-12 lg:mx-22 px-3 z-0'>
                        {cast?.map(function (member) {
                            return (
                                <div key={member.id} className='md:w-[150px] md:h-[280px] rounded-lg shadow-xl bg-[#313131] align-center'>
                                    <img
                                        className='w-full h-[200px] object-cover rounded-t'
                                        src={member.profile_path ? `https://image.tmdb.org/t/p/original/${member?.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'}
                                        alt={member.name}
                                    />
                                    <div className='text-white py-3'>
                                        <div className='font-bold text-center'> {member?.name.length > 14 ? member.name.slice(0, 15) + ".." : member?.name}</div>
                                        <div className='text-center'>
                                            {member?.character.length > 10 ? member.character.slice(0, 10) + ".." : member?.character}
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                        <button onClick={showHandler} className='border-2 h-fit text-white hover:bg-teal-700 border-gray-300 p-2 my-auto w-[50%] transition duration-500 ease-in-out transform hover:scale-105'>
                            {show}
                        </button>

                    </div>
                    {review &&
                        <>
                            <h1 className='text-teal-500 text-4xl py-16 font-bold mx-32 mt-2'>Reviews</h1>

                            <div class="shadow-xl bg-[#313131] rounded-lg p-4 md:mx-32 lg:mx-12 mx-4 mt-0">
                                <h2 class="text-2xl font-bold text-white mb-4 px-4">Top reviews</h2>
                                <ul className='flex gap-2 flex-col '>
                                    {
                                        review.results?.map(function (sol) {
                                            return (
                                                <li key={sol.id} class="shadow-lg rounded-md py-4 px-4">
                                                    <h3 class="text-xl font-bold text-gray-200 mb-2">Great product!</h3>
                                                    <p class="text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sol?.content ? sol?.content.slice(0,300)+'...' : 'No reviews'), }} />
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        </>

                    }

                    <DetailFoot />

                    {(video && play) &&
                                <div class="absolute xl:top-[25%] md:top-[25%] top-[27%]  left-0 right-0  p-12 w-[90%] md:w-[90%] lg:w-[40%] xl:h-[500px] md:h-[500px] h-[00px] bg-gray-400 border flex mx-auto  justify-center z-50">
                                    <YouTube className='w-fit ' videoId={video.key} />

                                </div>

                            }


                </div> : <Error />}


        </>

    )
}

export default Detail
