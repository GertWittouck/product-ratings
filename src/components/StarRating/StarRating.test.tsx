import { render, screen } from '@testing-library/react'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('renders five tiles by default', () => {
    render(<StarRating rating={4.6} />)

    expect(screen.getAllByTestId('star-tile')).toHaveLength(5)
  })

  it('fills the first four tiles and 60% of the last one for a rating of 4.6', () => {
    render(<StarRating rating={4.6} />)

    const fills = screen
      .getAllByTestId('star-tile')
      .map((tile) => (tile.firstElementChild as HTMLElement).style.width)

    expect(fills.slice(0, 4)).toEqual(['100%', '100%', '100%', '100%'])
    expect(parseFloat(fills[4])).toBeCloseTo(60)
  })

  it('renders the number of tiles given by maxStars', () => {
    render(<StarRating rating={2} maxStars={3} />)

    expect(screen.getAllByTestId('star-tile')).toHaveLength(3)
  })
})
