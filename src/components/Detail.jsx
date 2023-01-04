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
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import DOMPurify from 'dompurify'
import DetailFoot from './DetailFoot';
import { ImBackward } from "react-icons/im";
import Load from '../Load';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Detail = () => {

    const api = 'cd044f6d93442c21362eeb8daf590a27'

    const { detail, setSaved, saved } = useContext(Context)
    const { pathname } = useLocation();
    var summary = '';
    const [show, setShow] = useState('Show Less')
    const [cast, setCast] = useState(null)
    const [review, setReview] = useState(null)
    const [video, setVideo] = useState('')
    const [play, setPlay] = useState(false)
    const url = `https://api.themoviedb.org/3/movie/${detail?.id}/credits?api_key=${api}`
    const review_url = `https://api.themoviedb.org/3/movie/${detail?.id}/reviews?api_key=${api}`;
    const [loader, setLoader] = useState(true)
    const [imgLoader, setImgLoader] = useState(true);
    const [book, setBook] = useState([])
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // Other player options...
        }
    };

    const optsMobile = {
        height: '300',
        width: '480',
        playerVars: {
            // Other player options...
        }
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
            setLoader(false)
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
        else {
            setLoader(false)
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



    return (
        <>{loader ? <Load /> :
            <>
                {detail ?

                    <div >
                        <div className='mx-3 xl:ml-12'>
                            <div className='md:h-auto xl:w-[80%] mt-2 rounded-lg overflow-hidden w-auto relative h-[400px]'>
                                <img

                                    className='h-full w-full object-cover brightness-75 hover:brightness-50 transition-all ease-in-out duration-500'
                                    src={detail.backdrop_path ? `https://image.tmdb.org/t/p/original/${detail?.backdrop_path}` : 'https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc'}
                                    alt={detail?.title}
                                    effect='blur'
                                />

                                {(video && play) &&
                                    <div className='md:h-full absolute z-50 top-0 w-full h-[300px]'>


                                        <div className="flex flex-col items-center w-full h-full rounded overflow-hidden mx-auto ">
                                            < button size={30} onClick={() => { setPlay(false) }} className='flex items-center gap-1 font-family-sans absolute top-0 right-0 bg-[#3f403f] border-1 border-teal-500 text-teal-500 border rounded-lg md:px-4 md:py-2 px-2 py-2'>
                                                <ImBackward size={20} />
                                                <p>close</p>
                                            </button>
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video?.key}`}
                                                frameBorder="0"
                                                allowFullScreen
                                                className="bg-teal-500 h-full w-full"
                                            ></iframe>

                                        </div>
                                    </div>
                                }

                                <div className='absolute bottom-2 left-2 md:bottom-12 md:left-12'>
                                    <div className='flex gap-4'>
                                        <div onClick={playHandler} className='md:text-xl flex items-center gap-1 border-2 border-teal-500 px-3 py-2 cursor-pointer bg-teal-700 transition duration-500 ease-in-out transform hover:scale-105'>
                                            <BsPlayFill size={20} />
                                            <p>Play</p>
                                        </div>
                                        <button className='md:text-xl  border-2 border-teal-500 px-3 py-2 cursor-pointer bg-teal-700 transition duration-500 ease-in-out transform hover:scale-105'>
                                            Watch Later
                                        </button>
                                    </div>

                                </div>




                            </div>

                            <div className='mt-6 xl:w-[80%]'>
                                <div className='flex justify-start items-center md:gap-12 '>

                                    <LazyLoadImage
                                        className='w-[480px] hidden md:hidden xl:block h-[440px] object-cover rounded-lg'
                                        src={detail.poster_path ? `https://image.tmdb.org/t/p/original/${detail?.poster_path}` : 'https://imgs.search.brave.com/A_PbIOfM-hxkSoGkZ0XISKfHbXv0EKrNkNL8fkVkll4/rs:fit:1150:647:1/g:ce/aHR0cHM6Ly93d3cu/c2Fsb25sZmMuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzAxL2ltYWdlLW5v/dC1mb3VuZC0xLXNj/YWxlZC0xMTUweDY0/Ny5wbmc'}
                                        alt={detail?.title}
                                        effect='blur'
                                    />

                                    <div >
                                        <h1 className='font-family-sans text-4xl text-teal-500 py-6'>{detail?.title}</h1>

                                        <p className='text-gray-400 text-lg py-2'>
                                            Released: {detail?.release_date}
                                        </p>
                                        <div className='flex items-center py-2 gap-2'><AiFillStar color='teal-500' size={20} /><span className='items-center'>{detail.vote_average}</span><span className='text-teal-500 ml-2 font-bold'>Votes</span><span>{detail.vote_count}</span></div>
                                        <p className='xl:w-[65%] md:w-[80%] w-full text-lg mb-2 text-gray-200 pt-1'>
                                            {summary}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h1 className='text-teal-500 text-4xl font-family-sans py-4 md:py-12 font-bold '>casts</h1>

                                <div className='grid lg:grid-cols-9 md:grid-cols-4 grid-cols-2 lg:gap-6 gap-4 z-0'>
                                    {cast?.map(function (member) {
                                        return (
                                            <div key={member.id} className='md:w-[170px] md:h-[280px] rounded-lg  shadow-xl bg-[#313131] align-center overflow-hidden'>
                                                <LazyLoadImage
                                                    className='w-[200px] h-[200px] object-cover rounded-t'
                                                    src={member.profile_path ? `https://image.tmdb.org/t/p/original/${member?.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'}
                                                    alt={member?.name}
                                                    effect='blur'
                                                />
                                                <div className='text-white py-3'>
                                                    <div className='font-bold text-center'> {member?.name.length > 14 ? member.name.slice(0, 15) + ".." : member?.name}</div>
                                                    <div className='text-center'>
                                                        {member?.character?.length > 10 ? member.character.slice(0, 10) + ".." : member?.character}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}
                                    <button onClick={showHandler} className='border-2 h-fit m-2  text-white hover:bg-teal-700 border-gray-300 p-2 my-auto w-[50%] transition duration-500 ease-in-out transform hover:scale-105'>
                                        {show}
                                    </button>

                                </div>


                            </div>
                            <div>
                                {review &&
                                    <>
                                        <h1 className='text-teal-500 text-4xl font-family-sans py-[40px] md:py-12 font-bold '>reviews</h1>

                                        <div className="shadow-xl bg-[#313131] rounded-lg xl:mr-32">
                                            <h2 className="text-2xl font-bold text-white mb-4 px-4">Top reviews</h2>
                                            <ul className='flex gap-2 flex-col '>
                                                {
                                                    review.results?.map(function (sol) {
                                                        return (
                                                            <li key={sol.id} class="shadow-lg rounded-md py-4 px-4">
                                                                <h3 className="text-xl font-bold text-gray-200 mb-2">Great product!</h3>
                                                                <p className="text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sol?.content ? sol?.content.slice(0, 300) + '...' : 'No reviews'), }} />
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div>
                                    </>

                                }
                            </div>


                        </div>

                        <DetailFoot />
                    </div>

                    : <Error />}


            </>}

        </>
    )
}

export default Detail
