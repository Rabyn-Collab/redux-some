import { nanoid } from '@reduxjs/toolkit';
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { postAdd } from '../features/postSlice';


const CrudForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      detail: '',

    },
    onSubmit: (val, { resetForm }) => {
      const newPost = {
        title: val.title,
        detail: val.detail,
        id: nanoid()
      };
      dispatch(postAdd(newPost));
      resetForm();
    },

  });

  return (
    <div>
      <div className=" max-w-lg  mt-10">
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input onChange={formik.handleChange} value={formik.values.title} className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Tile" />
            {formik.errors.title && <p className='text-pink-500'>{formik.errors.title}</p>}


          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail">
              Detail
            </label>
            <input onChange={formik.handleChange} value={formik.values.detail} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="detail" type="text" placeholder="detail" />


          </div>


          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[50%] " type="submit">
            Submit
          </button>
        </form>

      </div>
    </div>
  )
}

export default CrudForm
