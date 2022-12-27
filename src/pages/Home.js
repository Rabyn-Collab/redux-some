import React from 'react'
import { useNavigate } from 'react-router'
import { useGetMoviesCategoryQuery } from '../features/movieSlice';

const Home = () => {
  const nav = useNavigate();

  const { data, isError, isLoading } = useGetMoviesCategoryQuery('/movie/top_rated');
  console.log(data && data['results']);
  return (
    <div>

      <h1>Home Page</h1>
      <button onClick={() => nav('/about')}>About Page</button>


    </div>
  )
}

export default Home
