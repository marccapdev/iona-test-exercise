import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCatContext } from '../context/CatContext'
import { getCatsImagesByBreed } from '../api/CatApi'

interface CatImage {
  id: string
  url: string
}

export const CatGrid = (): JSX.Element => {
  const { selectedBreed } = useCatContext()
  const [images, setImages] = useState<CatImage[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const navigate = useNavigate()

  // Combined fetching function to avoid duplication
  const fetchImages = useCallback(async () => {
    if (selectedBreed === '') return

    setLoading(true)
    try {
      const fetchedImages = await getCatsImagesByBreed(selectedBreed, page, 6)
      setImages((prevImages) => [...prevImages, ...fetchedImages])
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedBreed, page])

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1)
  }

  const viewDetails = (imageId: string): void => {
    navigate(`/cat/${imageId}`)
  }

  useEffect(() => {
    // Reset images when breed changes
    setImages([])
    setPage(0)
  }, [selectedBreed])

  useEffect(() => {
    // Ensure we don't duplicate the initial fetch
    if (page > 0) {
      fetchImages().catch(error => { console.error('Error fetching images:', error) })
    }
  }, [selectedBreed, page])

  // Initial load or re-load when breed changes
  useEffect(() => {
    if (selectedBreed !== '' && page === 0) {
      setImages([]) // Clear images on breed change
      fetchImages().catch(error => { console.error('Error fetching images:', error) })
    }
  }, [selectedBreed, page])

  return (
    <div className='cat-grid'>
      {loading && <p>Loading...</p>}
      <div className="row">
        {images.map((image) => (
          <div key={image.id} className='col-md-4 col-12'>
            <div className="cat-item">
              <div className='cat-item__image-wrapper'>
                <img src={image.url} alt="Cat" className="cat-item__image" />
              </div>
              <button className='cat-item__btn' onClick={() => { viewDetails(image.id) }}>View details</button>
            </div>
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="row">
          <div className="col d-grid">
            <button className='btn btn-load-more' onClick={handleLoadMore} disabled={loading}>
              Load more
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
