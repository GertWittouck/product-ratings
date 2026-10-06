import { getProductRating } from './getProductRating'

describe('getProductRating', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the rating data when the request succeeds', async () => {
    const data = { maxStars: 5, breakdown: [{ stars: 5, count: 10 }] }
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(data), { status: 200 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(getProductRating()).resolves.toEqual(data)
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/productRating'))
  })

  it('throws an error when the server responds with an error status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 500 })))

    await expect(getProductRating()).rejects.toThrow('status 500')
  })
})
