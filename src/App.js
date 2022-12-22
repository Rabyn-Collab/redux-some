import { useDispatch, useSelector } from 'react-redux';
import Modal from './component/Modal'
import { changePost, resetPost, toggleModal, toggleUpdate } from './features/postSlice';

const App = () => {

  const { posts, modalShow } = useSelector((store) => store.post);
  const dispatch = useDispatch();




  return (
    <div>

      <div className='flex justify-end'>
        <button onClick={() => {
          dispatch(resetPost());
          dispatch(toggleUpdate(false));
          dispatch(toggleModal());
        }} className='bg-blue-400 py-2 px-5 rounded-md text-white hover:text-pink-700'>Create Post</button>
      </div>
      {posts && posts.map((post) => {
        return <div key={post.id}>
          <h1>{post.title}</h1>
          <button onClick={() => {
            dispatch(toggleUpdate(true));
            dispatch(changePost({
              title: post.title,
              detail: post.detail,
              id: post.id
            }))
            dispatch(toggleModal());
          }}>Edit</button>
        </div>
      })}

      {modalShow ? <Modal /> : null}
    </div>
  )
}

export default App
