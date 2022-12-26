import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
  const nav = useNavigate();
  return (
    <div>

      <h1>Home Page</h1>
      <button onClick={() => nav('/about')}>About Page</button>


    </div>
  )
}

export default Home
