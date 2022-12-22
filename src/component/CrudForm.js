import { nanoid } from '@reduxjs/toolkit';
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postAdd, postEdit, toggleModal } from '../features/postSlice';


const CrudForm = () => {
  const dispatch = useDispatch();

  const { post, isEdit } = useSelector((store) => store.post);

  const formik = useFormik({
    initialValues: {
      title: post.title,
      detail: post.detail,
    },

    onSubmit: (val, { resetForm }) => {

      const newPost = {
        title: val.title,
        detail: val.detail,
        id: nanoid()
      };
      if (isEdit) {
        dispatch(postEdit({
          newPost: {
            title: val.title,
            detail: val.detail,
            id: post.id
          }
        }));
        resetForm();
        dispatch(toggleModal());
      } else {
        dispatch(postAdd(newPost));
        resetForm();
        dispatch(toggleModal());
      }

    },

  });

  return (
    <div>
      <div className="w-[500px]   mt-10 bg-white shadow-md rounded">
        <div className='flex justify-end px-2'>
          <button onClick={() => dispatch(toggleModal())}><i className="fa-solid fa-xmark fa-lg"></i></button>
        </div>

        <form onSubmit={formik.handleSubmit} className="px-8 pt-6 pb-8 mb-4">

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


          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-full " type="submit">
            Submit
          </button>


        </form>

      </div>
    </div>
  )
}

export default CrudForm
