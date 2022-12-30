import React from 'react'
import { useLocation } from 'react-router';
import { useGetMovieIdQuery } from '../features/movieSlice';

const Detail = () => {

  const { state } = useLocation();

  const { data, isLoading } = useGetMovieIdQuery(state.movieId);

  return (
    <div>
      {data && <div className='m-5'>
        <iframe className='aspect-video' src={`https://www.youtube.com/embed/${data?.results[0].key}`} allowFullScreen></iframe>
      </div>}
    </div>
  )
}

export default Detail
