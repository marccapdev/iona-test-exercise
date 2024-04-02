import React, { useState, useEffect } from 'react'
import { useCatContext } from '../context/CatContext'
import { getBreeds } from '../api/CatApi'

interface Breed {
  id: string
  name: string
}

export const BreedSelector = (): JSX.Element => {
  const [breeds, setBreeds] = useState<Breed[]>([])
  const { selectedBreed, setSelectedBreed } = useCatContext()

  useEffect(() => {
    const fetchBreeds = async (): Promise<void> => {
      try {
        const breedData = await getBreeds()
        setSelectedBreed(breedData[0].id)
        setBreeds(breedData)
      } catch (error) {
        console.error('Error fetching breeds:', error)
      }
    }

    fetchBreeds().catch(error => {
      console.error('Error in fetchBreeds:', error)
      return undefined
    })
  }, [])

  return (
    <div className='breed-selector__wrapper'>
      <h3>Select a Cat Breed</h3>
      <select className='breed-selector' value={selectedBreed} onChange={(e) => { setSelectedBreed(e.target.value) }}>
        {breeds.map((breed) => <option className='breed-selector__option' key={breed.id} value={breed.id}>{breed.name}</option>)}
      </select>
    </div>
  )
}
