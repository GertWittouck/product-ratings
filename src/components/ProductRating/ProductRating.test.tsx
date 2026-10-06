import { render, screen } from '@testing-library/react'
import type { RatingSummary } from '../../types/rating'
import { ProductRating } from './ProductRating'

const data: RatingSummary = {
  maxStars: 5,
  breakdown: [
    { stars: 5, count: 952 },
    { stars: 4, count: 171 },
    { stars: 3, count: 55 },
    { stars: 2, count: 14 },
    { stars: 1, count: 40 },
  ],
}

describe('ProductRating', () => {
  it('shows the rating label as the heading of the card', () => {
    render(<ProductRating data={data} />)

    expect(screen.getByRole('heading', { name: 'Excellent' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Excellent' })).toBeInTheDocument()
  })

  it('shows the average calculated from the breakdown', () => {
    render(<ProductRating data={data} />)

    expect(screen.getByText('4.6 out of 5')).toBeInTheDocument()
  })

  it('shows the Feefo branding', () => {
    render(<ProductRating data={data} />)

    expect(screen.getByText(/Product Rating/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Feefo' })).toBeInTheDocument()
  })

  it('shows a row for every star level', () => {
    render(<ProductRating data={data} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(5)
    expect(screen.getByText('5 stars: 952 reviews (77%)')).toBeInTheDocument()
    expect(screen.getByText('1 star: 40 reviews (3%)')).toBeInTheDocument()
  })

  it('shows a different label when the average is lower', () => {
    render(
      <ProductRating
        data={{
          maxStars: 5,
          breakdown: [
            { stars: 3, count: 10 },
            { stars: 2, count: 2 },
          ],
        }}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Good' })).toBeInTheDocument()
    expect(screen.getByText('2.8 out of 5')).toBeInTheDocument()
  })
})
