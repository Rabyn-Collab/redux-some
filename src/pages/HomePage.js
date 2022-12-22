import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import CrudForm from '../component/CrudForm'
import { changePost, postRemove } from '../features/postSlice';


const HomePage = () => {

  const numbers = [222, 55, 99];

  // numbers.splice(2, 1);
  // console.log(numbers);

  const dispatch = useDispatch();

  // const newNumbers = [...numbers, 90];

  const { posts } = useSelector((store) => {
    return store.post;
  });
  const [isShow, setShow] = useState(false);


  const handleChange = () => {
    setShow(!isShow);
  }

  return (
    <div>

      <div className='flex justify-end'>
        <button onClick={() => handleChange()} type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal" data-bs-target="#exampleModalScrollable">
          Create post
        </button>
      </div>


      {posts && posts.map((post, i) => {
        return <div key={post.id} className='p-4'>
          <h1>{post.title}</h1>
          <h1>{post.detail}</h1>
          <div className='space-x-5'>
            <button
              onClick={() => {
                dispatch(changePost({
                  title: post.title,
                  detail: post.detail
                }));
                handleChange();
              }}
              className='text-green-400'> <i className="fa-regular fa-pen-to-square "></i> </button>
            <button onClick={() => dispatch(postRemove(i))} className='text-pink-500'> <i className="fa-solid fa-trash "></i> </button>

          </div>
        </div>
      })}



      <div className={`${isShow ? 'absolute inline-block modal fade top-[10%] left-[40%] w-[500px]   outline-none shadow-2xl' : 'hidden modal fade top-0 left-0 max-w-4xl mx-auto h-full outline-none shadow-2xl'}`}
        id="exampleModalScrollable" tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                Modal title
              </h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body relative p-4">
              <CrudForm changeSome={handleChange} />
            </div>
            <div
              className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            </div>
          </div>
        </div>
      </div>





      {/* <CrudForm /> */}

    </div>
  )
}

export default HomePage
