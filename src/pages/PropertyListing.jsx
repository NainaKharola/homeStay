import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProperties } from '../services/propertyService'
import HomestayCard from '../components/HomestayCard'
import { Loader, Toast, EmptyState, Input, Button } from '../components/ui'

const PROPERTIES_API_URL =
  import.meta.env.VITE_PROPERTIES_API_URL ||
  'http://localhost:5000/api/properties'

function PropertyListing() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(searchQuery)

  // Filter States
  const [maxPrice, setMaxPrice] = useState('')
  const [minRating, setMinRating] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchListings() {
      try {
        setLoading(true)
        setError('')

        // Fetch using search endpoint if query exists, else get all
        let url = PROPERTIES_API_URL
        if (searchQuery.trim()) {
          url = `${PROPERTIES_API_URL}/search?q=${encodeURIComponent(searchQuery)}`
        }

        const token = localStorage.getItem('homestay_token')
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(url, {
          signal: controller.signal,
          headers,
        })

        if (!res.ok) {
          throw new Error('Failed to load properties from backend.')
        }

        const data = await res.json()
        setProperties(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to retrieve stays.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchListings()

    return () => controller.abort()
  }, [searchQuery])

  function handleSearch(e) {
    e.preventDefault()
    setSearchParams(searchTerm.trim() ? { q: searchTerm } : {})
  }

  // Filter properties locally for extra granularity (e.g. price, rating)
  const filteredProperties = properties.filter((item) => {
    if (maxPrice && item.price > Number(maxPrice)) return false
    if (minRating && item.rating < Number(minRating)) return false
    return true
  })

  const resetFilters = () => {
    setSearchTerm('')
    setSearchParams({})
    setMaxPrice('')
    setMinRating('')
  }

  return (
    <section className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-700">
            Find your adventure
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Explore Homestays
          </h1>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto">
            Book unique homestays and villas, hosted by local families across the country.
          </p>
        </div>

        {error && (
          <div className="mb-6 max-w-3xl mx-auto">
            <Toast message={error} onClose={() => setError('')} type="error" />
          </div>
        )}

        {/* Search and Filters Layout */}
        <div className="grid gap-6 lg:grid-cols-4 mb-10">
          {/* Filters Sidebar */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 h-fit lg:col-span-1 space-y-6">
            <h2 className="text-lg font-bold text-navy-900 border-b border-slate-100 pb-3">Filters</h2>
            
            {/* Price Filter */}
            <div className="space-y-2">
              <label htmlFor="price-filter" className="block text-sm font-semibold text-slate-700">Max Price (per night)</label>
              <input
                id="price-filter"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label htmlFor="rating-filter" className="block text-sm font-semibold text-slate-700">Minimum Rating</label>
              <select
                id="rating-filter"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
              >
                <option value="">Any Rating</option>
                <option value="4.9">★ 4.9 & Above</option>
                <option value="4.7">★ 4.7 & Above</option>
                <option value="4.5">★ 4.5 & Above</option>
                <option value="4.0">★ 4.0 & Above</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="w-full rounded-xl text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 py-2.5 transition"
            >
              Clear All Filters
            </button>
          </div>

          {/* Stays Grid & Search */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by city or property title (e.g. Manali, Goa)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-none px-3 py-2 text-sm text-navy-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
              <Button type="submit" text="Search" className="px-6 py-2.5 text-sm" />
            </form>

            {loading ? (
              <div className="flex justify-center items-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <Loader label="Searching cozy stays..." />
              </div>
            ) : filteredProperties.length === 0 ? (
              <EmptyState
                title="No homestays match your search"
                description="Try loosening your filters, modifying your location query, or exploring our standard stays."
                actionText="Reset Search"
                onAction={resetFilters}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProperties.map((property) => (
                  <HomestayCard key={property._id || property.id} homestay={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyListing
