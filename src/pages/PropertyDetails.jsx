import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Loader, Toast, Button } from '../components/ui'

const PROPERTIES_API_URL =
  import.meta.env.VITE_PROPERTIES_API_URL ||
  'http://localhost:5000/api/properties'

function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toastMsg, setToastMsg] = useState(null)

  // Booking Simulation State
  const [guests, setGuests] = useState('1')
  const [nights, setNights] = useState('2')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${PROPERTIES_API_URL}/${id}`)

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('This property could not be found.')
          }
          throw new Error('Error retrieving property details.')
        }

        const data = await res.json()
        setProperty(data)

        // Check if saved
        const savedStays = JSON.parse(localStorage.getItem('homestay_saved_properties') || '[]')
        setSaved(savedStays.some((item) => item._id === data._id || item.id === data.id))
      } catch (err) {
        setError(err.message || 'Unable to retrieve property.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProperty()
  }, [id])

  const subtotal = useMemo(() => {
    if (!property) return 0
    return property.price * Number(nights || 1)
  }, [property, nights])

  const handleToggleSave = () => {
    if (!property) return
    let savedStays = JSON.parse(localStorage.getItem('homestay_saved_properties') || '[]')
    const alreadySaved = savedStays.some((item) => item._id === property._id || item.id === property.id)

    if (alreadySaved) {
      savedStays = savedStays.filter((item) => item._id !== property._id && item.id !== property.id)
      setSaved(false)
      setToastMsg({ type: 'info', text: 'Removed from saved stays.' })
      logActivity(`Removed property "${property.title}" from bookmarks.`)
    } else {
      savedStays.push(property)
      setSaved(true)
      setToastMsg({ type: 'success', text: 'Saved to bookmarks!' })
      logActivity(`Bookmarked property "${property.title}".`)
    }

    localStorage.setItem('homestay_saved_properties', JSON.stringify(savedStays))
  }

  // Activity logger helper
  const logActivity = (description) => {
    const list = JSON.parse(localStorage.getItem('homestay_activities') || '[]')
    list.unshift({
      id: Date.now(),
      description,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem('homestay_activities', JSON.stringify(list.slice(0, 15)))
  }

  const handleBook = (e) => {
    e.preventDefault()
    setBookingSuccess(true)
    logActivity(`Booked stay at "${property.title}" for ${nights} nights (${guests} guests)`)
    setTimeout(() => {
      setBookingSuccess(false)
      setToastMsg({ type: 'success', text: 'Stay requested! Host will contact you shortly.' })
    }, 2000)
  }

  if (loading) {
    return (
      <div className="grid min-h-[500px] place-items-center bg-slate-50">
        <Loader label="Loading property details..." />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-5xl mb-4">🏠</div>
        <h2 className="text-2xl font-bold text-navy-900">Oops! Stay unavailable</h2>
        <p className="mt-2 text-slate-500">{error || 'This property details are currently unavailable.'}</p>
        <Link to="/properties" className="mt-6 inline-block font-semibold text-forest-600 hover:text-forest-700">
          ← Back to Explorer
        </Link>
      </div>
    )
  }

  return (
    <section className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {toastMsg && (
          <div className="mb-6">
            <Toast message={toastMsg.text} type={toastMsg.type} onClose={() => setToastMsg(null)} />
          </div>
        )}

        <div className="mb-6">
          <Link to="/properties" className="font-semibold text-slate-500 hover:text-forest-600 transition flex items-center gap-2">
            <span>←</span> Back to Stays
          </Link>
        </div>

        {/* Title Details Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">{property.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold">
              <span className="text-slate-500">⌖ {property.location}</span>
              <span className="text-amber-500">★ {property.rating} rating</span>
              <span className="rounded-full bg-forest-50 px-3 py-1 text-xs text-forest-700">Verified Stays</span>
            </div>
          </div>

          <button
            onClick={handleToggleSave}
            className={`rounded-full px-5 py-2.5 font-semibold transition border flex items-center gap-2 text-sm shadow-sm ${
              saved
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{saved ? '❤️' : '🤍'}</span>
            {saved ? 'Saved Stay' : 'Save Stay'}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-md border border-slate-100 mb-10 group">
          <img
            src={property.image}
            alt={property.title}
            className="w-full max-h-[480px] object-cover transition duration-700 group-hover:scale-102"
          />
        </div>

        {/* Description & booking wrapper */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 sm:p-8">
              <h2 className="text-xl font-bold text-navy-900 border-b border-slate-100 pb-4">
                About this stay
              </h2>
              <p className="mt-6 text-slate-600 leading-8 whitespace-pre-wrap">{property.description}</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 sm:p-8">
              <h2 className="text-xl font-bold text-navy-900 border-b border-slate-100 pb-4">
                Stay Details & Amenities
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">✓ High-speed Internet</div>
                <div className="flex items-center gap-2">✓ Equipped Kitchenette</div>
                <div className="flex items-center gap-2">✓ Private Bathroom</div>
                <div className="flex items-center gap-2">✓ Fresh Linens & Toiletries</div>
              </div>
            </div>
          </div>

          {/* Booking Simulator Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 sticky top-24">
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
                <span className="text-slate-500 font-semibold text-sm">Price</span>
                <p className="text-2xl font-black text-navy-900">
                  ₹{property.price.toLocaleString('en-IN')}{' '}
                  <span className="text-sm font-normal text-slate-500">/ night</span>
                </p>
              </div>

              <form onSubmit={handleBook} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="nights-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Number of Nights</label>
                  <input
                    id="nights-input"
                    type="number"
                    min="1"
                    max="30"
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    required
                    disabled={bookingSuccess}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
                  />
                </div>

                <div>
                  <label htmlFor="guests-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Guests</label>
                  <select
                    id="guests-input"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    disabled={bookingSuccess}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>

                {/* Subtotal summary */}
                <div className="rounded-2xl bg-slate-50 p-4 space-y-2.5">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>₹{property.price.toLocaleString('en-IN')} x {nights} nights</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Cleaning / Service fee</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2.5 flex justify-between font-bold text-navy-900">
                    <span>Total Amount</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingSuccess}
                  className="w-full rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold py-3 transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {bookingSuccess ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Requesting Booking...
                    </>
                  ) : (
                    'Request Booking'
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-slate-400">
                You won&apos;t be charged yet. Host approvals take under 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyDetails
