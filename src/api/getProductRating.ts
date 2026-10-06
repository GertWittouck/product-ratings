import type { RatingSummary } from '../types/rating'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

/** Fetches the product rating from the backend (json-server in development). */
export async function getProductRating(): Promise<RatingSummary> {
  const response = await fetch(`${API_URL}/productRating`)

  if (!response.ok) {
    throw new Error(`Failed to load product rating (status ${response.status})`)
  }

  return response.json()
}
