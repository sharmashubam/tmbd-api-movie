import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { DetailContext } from '../DetailContext'
import { Main } from './Main'

const Data = () => {
  const [data, setData] = useState([]);
  const [newData,setnewData]= useState([]);

  const {search,setSearch} = useContext(DetailContext);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all").then(function (response) {
      return response.json();
    }).then(function (data) {
      setData(data);
    })
  }, [])

  //only fetching when search state changes
  useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`).then(function (response) {
      return response.json();
    }).then(function (data) {
     setnewData(data)
    })
  }, [search])
  
  return (
    
    <div className="grid grid-cols-4 gap-8">
      {!search?<Main data={data}></Main> :<Main data ={newData}></Main>}
 
    </div>


  )
}

export default Data