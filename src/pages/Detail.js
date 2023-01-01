import React from 'react'
import { useLocation } from 'react-router';
import { useGetMovieIdQuery } from '../features/movieSlice';

const Detail = () => {

  const { state } = useLocation();

  const { data, isLoading } = useGetMovieIdQuery(state.movieId);

  return (
    <div>
      {data && <div style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w600_and_h900_bestv2${state.poster_path}')`, backgroundRepeat: 'no-repeat' }} className='w-full min-h-screen absolute top-0 bg-cover '>
        <iframe className='w-[60%] sm:w-[90%] aspect-video m-5' src={`https://www.youtube.com/embed/${data?.results[0]?.key}`} allowFullScreen></iframe>
      </div>}
    </div>
  )
}

export default Detail
