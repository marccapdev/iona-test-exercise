import React from 'react'
import { BreedSelector } from '../components/BreedSelector'
import { CatGrid } from '../components/CatGrid'

const HomePage: React.FC = () => {
  return (
    <div className="page-home container">
      <div className="page-header">
        <h1>Cat Browser</h1>
      </div>
      <BreedSelector />
      <CatGrid />
    </div>
  )
}

export default HomePage
