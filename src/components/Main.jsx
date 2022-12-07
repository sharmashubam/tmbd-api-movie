import React from 'react'
import { useContext } from 'react'
import { Detail } from './Detail';

import { DetailContext } from '../DetailContext';


export const Main = (props) => {
    const { open, setOpen, setDetail } = useContext(DetailContext);
    const clickhandler = function (e) {
        setDetail(e)
        setOpen(true);
    }

    return (
        <>
            {!open ? props.data.map(function (item, index) {
                return (
                    <div className=' rounded shadow-lg overflow-hidden flex flex-col align-center'
                        key={index} onClick={() => { clickhandler(item) }}>
                        <img className='w-[310px] h-[430px] object-cover rounded-md mx-auto ' src={ item.show.image && item.show.image.medium}></img>
                        <div className='flex justify-between font-semibold text-xl px-12'>
                            <h2 className='border p-1 rounded-xl' >{item.show.name && item.show.name}</h2>
                            <h2 className='border p-1 rounded-xl'>{item.show.status&&item.show.status}</h2>
                        </div>

                        <div className='px-12 font-semibold'><span className='text-xl font-semibold'>Release Date : </span> {item.show&&item.show.premiered}
                        </div>
                        <div className='px-12 font-semibold'><span className='text-xl font-semibold'>Runtime : </span> {item.show&&item.show.runtime}
                        </div>
                        

                    </div>
                )
            }) : <Detail></Detail>}
        </>
    )
}

// /{detail.show.premiered}</h2>

