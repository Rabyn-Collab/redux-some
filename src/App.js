import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './component/Modal'
import { changePost, isEdit, modalShow, resetPost } from './features/postSlice';

const App = () => {

  const { showModal, posts } = useSelector((store) => store.post);
  const disPatch = useDispatch();

  const handleCreate = () => {
    disPatch(resetPost());
    disPatch(isEdit(false));
    disPatch(modalShow());
  }




  return (
    <>
      <div className='flex justify-end '>
        <button onClick={handleCreate} className='bg-pink-400 px-2 py-2 rounded-lg'>Create Post</button>
      </div>

      <div className='m-11'>
        {posts && posts.map((post, i) => {
          return <div key={post.id} className='p-5 shadow-xl space-y-3'>
            <h1 className='text-2xl font-semibold uppercase'>{post.title}</h1>
            <p className='text-lg '>{post.detail}</p>
            <div className='space-x-7'>
              <button onClick={() => {
                disPatch(changePost({
                  id: post.id,
                  title: post.title,
                  detail: post.detail
                }));
                disPatch(isEdit(true));
                disPatch(modalShow());

              }} className='text-green-600'><i className="fa-solid fa-pen-to-square fa-lg"></i></button>
              <button className='text-pink-600'><i className="fa-solid fa-trash fa-lg"></i></button>
            </div>
          </div>
        })}
      </div>



      {showModal ? <Modal /> : null}

    </>
  )
}

export default App
