import React from 'react'
import { useSelector } from 'react-redux'
import CrudForm from './component/CrudForm';


const App = () => {

  // const numbers = [222, 55, 99];
  // const newNumbers = [...numbers, 90];

  const { posts } = useSelector((store) => {
    return store.post;
  });

  return (
    <div>

      {posts && posts.map((post, i) => {
        return <div key={post.id}>
          <h1>{post.title}</h1>
          <h1>{post.detail}</h1>
        </div>
      })}

      <CrudForm />

    </div>
  )
}

export default App
