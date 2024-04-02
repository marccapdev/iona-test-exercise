import axios from 'axios'

interface Breed {
  id: string
  name: string
  origin: string
  temperament: string
  description: string
}

interface CatImages {
  id: string
  url: string
}

interface CatImageDetails {
  id: string
  url: string
  breeds: Breed[]
}

// Setup base URL and headers for axios
const apiClient = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': 'live_yvUNza8bVzrVzSEVKXNRp3RAVItZL20GiaY4gn2P4PNmUUctGlG95OTC989JKxk0'
  }
})

// Function to get breeds
export const getBreeds = async (): Promise<Breed[]> => {
  try {
    const response = await apiClient.get('/breeds')
    return response.data
  } catch (error) {
    console.error('Failed to fetch breeds:', error)
    throw error
  }
}

// Function to get cat images by breed
export const getCatsImagesByBreed = async (breedId: string, page = 0, limit = 6): Promise<CatImages[]> => {
  try {
    const response = await apiClient.get('/images/search', {
      params: {
        breed_ids: breedId,
        limit,
        page
      }
    })
    return response.data
  } catch (error) {
    console.error(`Failed to fetch images for breed ${breedId}:`, error)
    throw error
  }
}

// Function to get cat image details by image ID
export const getCatImageDetails = async (imageId: string): Promise<CatImageDetails> => {
  try {
    const response = await apiClient.get(`images/${imageId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch details for image ${imageId}:`, error)
    throw error
  }
}
