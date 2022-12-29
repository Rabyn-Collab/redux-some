import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useGetMoviesCategoryQuery } from '../features/movieSlice'

const Main = () => {
  const { category } = useParams();

  const { isLoading, data, isError, error } = useGetMoviesCategoryQuery(category ?? 'popular');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  if (isLoading) {
    return <div className='w-[32%] mx-auto pt-20'>
      <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_tmnc73b6.json" background="transparent" speed="1" loop autoplay></lottie-player>
    </div>
  }




  return (
    <div className='p-5 grid grid-cols-4 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
      {data && data.results.map((movie) => {
        return <div key={movie.id} className='shadow-lg hover:scale-105 ease-in duration-300 cursor-pointer '>
          <img className='w-full h-[400px] object-cover' src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt="" />
          <div className='p-4'>
            <h1 className='text-xl font-semibold'>{movie.title}</h1>
            <p>{movie.overview.substring(0, 50) + '...'}</p>
          </div>

        </div>
      })}

    </div>
  )
}

export default Main
