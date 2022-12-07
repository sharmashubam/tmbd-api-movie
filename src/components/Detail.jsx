import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { DetailContext } from '../DetailContext';

export const Detail = () => {
    const { detail ,setBook,book } = useContext(DetailContext);
    console.log(detail)
    const bookHandler= ()=>{
        setBook(true);
    }

    return (
        <div className=" w-[1440px] border rounded shadow-lg flex gap-2 justify-between mx-12 relative">
            <img className='h-[900px] w-[650px] mx-auto object-cover rounded-lg' src={detail.show.image &&  detail.show.image.original} alt="/" />
            <div className='flex flex-col'>
            <h2 className='text-xl font-semibold py-2'><span className='text-2xl font-bold'>Movie Name :</span>{detail.show.name}</h2>

                <h1 className='text-xl font-semibold py-2 pl-2'><span>Rating</span>{detail.score}</h1>
                <h1 className='text-xl font-semibold py-2 pl-2'>{detail.show.summary}</h1>
                <h2 className='text-xl font-semibold py-2 pl-2'>{detail.show.language}</h2>
                <h2 className='text-xl font-semibold py-2 pl-2'>{detail.show.name}</h2>
                <h2 className='text-xl font-semibold py-2 pl-2'>{detail.show.premiered}</h2>
                <h2 className='text-xl font-semibold py-2 pl-2'>{detail.show.rating.average}</h2>
                <h2 className='text-xl font-semibold py-2 pl-2'>{detail.show.status}</h2>
                <h2 className='text-xl font-semibold py-2 pl-2'>{detail.show.runtime}</h2>
                
            </div>
            <button  className='absolute right-12 border p-2 rounded-md bg-[#8c8cd7] px-3 font-semibold bottom-12' onClick={bookHandler}>Book ticket</button>
        </div>
    )
}
