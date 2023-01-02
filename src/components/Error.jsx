import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-teal-500 p-2">Error</h1>
            <p className="text-xl text-teal-200 text-center mb-8">
                Something went wrong. Go back or return
            </p>
            <Link to='/' class="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded animate shake hover:animate-spin transition duration-500 ease-in-out opacity-75 hover:opacity-100">
                Home
            </Link>
        </div>
    )
}

export default Error