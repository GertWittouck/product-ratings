import { render, screen, within } from '@testing-library/react'
import { RatingBreakdown } from './RatingBreakdown'

describe('RatingBreakdown', () => {
  it('lists the star levels from highest to lowest, even if the data is unordered', () => {
    render(
      <RatingBreakdown
        breakdown={[
          { stars: 1, count: 40 },
          { stars: 3, count: 55 },
          { stars: 5, count: 952 },
          { stars: 2, count: 14 },
          { stars: 4, count: 171 },
        ]}
      />,
    )

    const list = screen.getByRole('list', { name: 'Rating breakdown' })
    const items = within(list).getAllByRole('listitem')

    expect(items).toHaveLength(5)
    expect(items.map((item) => item.textContent?.charAt(0))).toEqual(['5', '4', '3', '2', '1'])
  })
})
