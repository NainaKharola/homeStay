import { useEffect, useState } from 'react'
import { getProperties } from '../services/propertyService'
import HomestayCard from './HomestayCard'
import { Loader, Toast } from './ui'

function FeaturedHomestays() {
  const [homestays, setHomestays] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperties() {
      try {
        setIsLoading(true)
        setError('')
        const properties = await getProperties({ signal: controller.signal })
        setHomestays(properties)
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Failed to load properties.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProperties()

    return () => controller.abort()
  }, [])

  return <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="mb-10"><p className="font-semibold uppercase tracking-wider text-forest-600">Handpicked for you</p><h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">Featured homestays</h2><p className="mt-3 text-slate-600">Warm hosts, beautiful settings, and stays worth remembering.</p></div>{error && <div className="mb-6"><Toast message={error} type="error" onClose={() => setError('')} /></div>}{isLoading ? <div className="flex justify-center py-12"><Loader label="Loading properties..." /></div> : <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{homestays.map((homestay) => <HomestayCard key={homestay.id} homestay={homestay} />)}</div>}</section>
}

export default FeaturedHomestays
