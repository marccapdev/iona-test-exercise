import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCatImageDetails } from '../api/CatApi'

interface Breed {
  id: string
  name: string
  origin: string
  temperament: string
  description: string
}

interface CatImageDetails {
  id: string
  url: string
  breeds: Breed[]
}

const SingleCatPage: React.FC = () => {
  const navigate = useNavigate()

  const { imageId } = useParams()
  const [catDetails, setCatDetails] = useState<CatImageDetails | null>(null)

  useEffect(() => {
    const fetchCatDetails = async (): Promise<void> => {
      try {
        if (typeof imageId === 'string' && imageId.trim() !== '') {
          const details = await getCatImageDetails(imageId)
          if (details !== null) {
            setCatDetails(details)
            console.log(details)
          } else {
            setCatDetails(null)
          }
        }
      } catch (error) {
        console.error('Error fetching cat details:', error)
        setCatDetails(null)
      }
    }

    fetchCatDetails().catch(console.error)
  }, [imageId])

  return (
    <div className='page-single-cat container'>
      <div className="page-header">
        <button className='page-header__btn-back' onClick={() => { navigate(-1) }}>Back</button>
        <h1>Cat Details</h1>
      </div>
      <hr />
      <div className="cat__container row">
        <div className="col-12 col-md-4">
          <img className='cat__image' src={catDetails?.url} alt={catDetails?.id} />
        </div>
        {catDetails?.breeds.map((breed: Breed, index: number) => {
          return (
            <div className='cat__details col-12 col-md-8' key={index}>
              <h2 className="cat__breed">{breed.name}</h2>
              <div className="cat__origin">Origin: {breed.origin}</div>
              <div className="cat__temperament">{breed.temperament}</div>
              <p className='cat__description'>{breed.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleCatPage
