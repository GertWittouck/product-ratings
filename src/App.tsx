import { ProductRating } from './components/ProductRating/ProductRating'
import { useProductRating } from './hooks/useProductRating'

function App() {
  const { data, isLoading, error } = useProductRating()

  return (
    <main className="page">
      {isLoading && <p role="status">Loading rating…</p>}
      {error && <p role="alert">{error}</p>}
      {data && <ProductRating data={data} />}
    </main>
  )
}

export default App
