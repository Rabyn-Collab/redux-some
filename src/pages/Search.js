import React from 'react'
import { useLocation } from 'react-router'
import { useGetSearchMoviesQuery } from '../features/movieSlice'

const Search = () => {
  const { state } = useLocation();

  const { data, isLoading } = useGetSearchMoviesQuery(state.searchText);

  if (isLoading) {
    return <div className='flex justify-center mt-56 text-2xl'>
      <h1>Loading...</h1>
    </div>
  }

  if (data && data.results.length === 0) {
    return <h1 className='m-16 text-2xl text-pink-500 tracking-wider'>Try using another keyword</h1>
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

export default Search
