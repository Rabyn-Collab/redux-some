import React from 'react'
import { useNavigate } from 'react-router'
import { useGetMoviesCategoryQuery } from '../features/movieSlice';
import Main from './Main';

const Home = () => {
  const nav = useNavigate();


  return (
    <div>

      <Main />

    </div>
  )
}

export default Home
