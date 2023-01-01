import { useFormik } from 'formik'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const nav = useNavigate();
  const { show } = useSelector((store) => store.show);

  const formik = useFormik({
    initialValues: {
      searchText: ''
    },
    onSubmit: (val, { resetForm }) => {
      nav('/movie/search', { state: { searchText: val.searchText } })
      resetForm();
    }
  });


  return (
    <div className={show ? 'opacity-0  h-0 w-0' : 'bg-[#032541] sticky top-0 text-white px-10 py-3 flex items-baseline justify-between w-full transition-opacity duration-300  ease-in '} >
      <div className="title">
        <NavLink to='/' className="text-2xl font-bold">TMDB</NavLink>
      </div>

      <nav className='space-x-5 flex'>
        <NavLink to='/movie/upcoming' className="text-lg font-semibold">UpComing</NavLink>
        <NavLink to='/movie/top_rated' className="text-lg font-semibold">TopRated</NavLink>

        <form onSubmit={formik.handleSubmit} className='w-[200px]'>
          <label htmlFor="searchText" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
          <div className="relative">
            <input onChange={formik.handleChange} value={formik.values.searchText} type="search" id="searchText" className="block w-full p-1 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none" placeholder='Search for movies' required />
            <div className='absolute inset-y-0 right-2 pr-2 flex items-center pl-3'>
              <button type='submit' className='text-green-500'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

          </div>
        </form>
      </nav>

    </div >
  )
}

export default Header
