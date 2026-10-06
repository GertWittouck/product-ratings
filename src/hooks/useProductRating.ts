import { useEffect, useState } from 'react'
import { getProductRating } from '../api/getProductRating'
import type { RatingSummary } from '../types/rating'

interface ProductRatingState {
  data: RatingSummary | null
  isLoading: boolean
  error: string | null
}

/** Loads the product rating once when the component mounts. */
export function useProductRating(): ProductRatingState {
  const [data, setData] = useState<RatingSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ignore the result if the component unmounts before the request finishes.
    let ignore = false

    getProductRating()
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch(() => {
        if (!ignore) setError('Sorry, we could not load the product rating.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return { data, isLoading, error }
}
