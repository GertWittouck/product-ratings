import { render, screen } from '@testing-library/react'
import App from './App'
import { getProductRating } from './api/getProductRating'

// Replace the real API call so the tests don't need json-server running
vi.mock('./api/getProductRating')
const mockedGetProductRating = vi.mocked(getProductRating)

describe('App', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('shows a loading message and then the product rating', async () => {
    mockedGetProductRating.mockResolvedValue({
      maxStars: 5,
      breakdown: [
        { stars: 5, count: 952 },
        { stars: 4, count: 171 },
        { stars: 3, count: 55 },
        { stars: 2, count: 14 },
        { stars: 1, count: 40 },
      ],
    })

    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading rating…')
    expect(await screen.findByRole('heading', { name: 'Excellent' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows an error message when the rating cannot be loaded', async () => {
    mockedGetProductRating.mockRejectedValue(new Error('Network error'))

    render(<App />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Sorry, we could not load the product rating.',
    )
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
