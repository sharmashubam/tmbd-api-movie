import React from 'react'
import { Circles } from 'react-loader-spinner'
const Load = () => {
    return (
        <div className=' h-screen w-screen flex justify-center items-center'>
            <Circles
                height="70"
                width="70"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Load