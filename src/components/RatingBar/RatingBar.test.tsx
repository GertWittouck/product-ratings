import { render, screen } from '@testing-library/react'
import { RatingBar } from './RatingBar'

function renderBar(stars: number, count: number, total: number) {
  return render(
    <ul>
      <RatingBar stars={stars} count={count} total={total} />
    </ul>,
  )
}

describe('RatingBar', () => {
  it('describes the row in words for screen readers', () => {
    renderBar(5, 952, 1232)

    expect(screen.getByRole('listitem')).toHaveTextContent('5 stars: 952 reviews (77%)')
  })

  it('uses the singular "star" for one star', () => {
    renderBar(1, 40, 1232)

    expect(screen.getByText('1 star: 40 reviews (3%)')).toBeInTheDocument()
  })

  it('sets the bar width to the share of the total', () => {
    renderBar(4, 25, 100)

    expect(screen.getByTestId('rating-bar-fill')).toHaveStyle({ width: '25%' })
  })

  it('shows an empty bar when there are no reviews at all', () => {
    renderBar(3, 0, 0)

    expect(screen.getByTestId('rating-bar-fill')).toHaveStyle({ width: '0%' })
  })
})
