import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CatProvider } from './context/CatContext'
import HomePage from './pages/HomePage'
import SingleCatPage from './pages/SingleCatPage'
import Header from './components/Header/Header'

const App: React.FC = () => {
  return (
    <>
      <CatProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cat/:imageId" element={<SingleCatPage />} />
          </Routes>
        </BrowserRouter>
      </CatProvider>
    </>
  )
}

export default App
