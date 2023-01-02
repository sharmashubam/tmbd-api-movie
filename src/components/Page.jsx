import React, { useContext } from 'react'
import { Context } from '../Context'
const Page = () => {
    const {page,setPage}= useContext(Context)
    const nextHandler= function(){
        setPage(function(prev){
            return prev+1;
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          
    }
    const prevHandler= function(){
        setPage(function(prev){
            if(prev>1) return prev-1;
            else return 1;
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          }); 
    }
    return (
        <div className="flex justify-center py-2 h-[350px] text-center gap-8">
            <button onClick={prevHandler} className="w-[90px] h-[40px] bg-teal-500 hover:bg-teal-700 my-auto">Previous</button>
            <button className="w-[50px] h-[40px] cursor-default bg-teal-500  my-auto">{page}</button>
            <button onClick={nextHandler} className="w-[90px] h-[40px] bg-teal-500 hover:bg-teal-700 my-auto">Next</button>
        </div>

        


    )
}

export default Page