import { useState } from 'react';
import './App.css';
import Booking from './components/Booking';
import Data from './components/Fetch';

import { DetailContext } from './DetailContext';

function App() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const[book,setBook]= useState(false);
  const [search,setSearch]= useState('');
  const[movie,setMovie]= useState("")
  const searchHandler=()=>{
    setSearch(movie)
  }
  console.log(detail)
  return (

    <DetailContext.Provider value={{ open, setOpen,book,setBook,detail, setDetail,search,setSearch}}>
      <div>
        <div >
          <input className='w-[500px] p-3 ml-8'  type="text" 
           onChange={(event) => setMovie(event.target.value)}
           value={movie}
           placeholder="Search for any movie"></input>
           <button className='rounded-sm p-3 bg-[#111111] text-white font-bold'
           type='submit' onClick={searchHandler} >Search</button>
        </div>
        {!book?<Data/>:<Booking/>}
      </div>
    </DetailContext.Provider>
  );
}



//We could have used the api for searching the movies and after searching the movie using the api and after that we could have rendered that eaily.
//i have used the api for searching the movie also..  

export default App;
