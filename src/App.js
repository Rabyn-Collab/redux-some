import React from 'react'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <>
      <Header />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<NotFound />} />

      </Routes>



    </>
  )
}

export default App
