import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Context } from './Context';
import { useState } from 'react';
import Page from './components/Page';
import Detail from './components/Detail';
import Trending from './components/Trending'
import Upcoming from './components/Upcoming';
import Search from './components/Search';
import Saved from './components/Saved';

import {Helmet} from "react-helmet";

function App() {
  const [movies, setMovies] = useState([])
  const [page,setPage]= useState(1);
  const [detail,setDetail]= useState(null);
  const[search,setSearch]= useState('');
  const [saved,setSaved] = useState([]);

  return (
    <div className=" text-white">
      <Context.Provider value={{movies,page,detail,search,saved,setSaved,setSearch,setDetail,setPage,setMovies}}>
      <Helmet>
                <meta charSet="utf-8" />
                <title>getMovies | Search Movies and Watch Trailers | Shubam Sharma</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        <Routes>
          <Route path='/' element={<><Navbar /> <Home /> <Page/> </>} />
          <Route path='/trending' element={<><Navbar /> <Trending /> <Page/> </>} />
          <Route path='/upcoming' element={<><Navbar /> <Upcoming/> <Page/></>}/>
          <Route path='/search' element={<><Navbar /> <Search/> <Page/></>} />
          <Route path='/saved' element={<><Navbar /> <Saved/></>} />
          <Route path='/detail' element={<Detail/>} />
        </Routes>
      </Context.Provider>

    </div>
  );
}

export default App;
