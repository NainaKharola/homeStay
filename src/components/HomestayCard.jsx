import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomestayCard({ homestay }) {
  const [saved, setSaved] = useState(false)
  const stayId = homestay._id || homestay.id

  useEffect(() => {
    const savedStays = JSON.parse(localStorage.getItem('homestay_saved_properties') || '[]')
    setSaved(savedStays.some((item) => item._id === homestay._id || item.id === homestay.id))
  }, [homestay])

  const handleToggleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let savedStays = JSON.parse(localStorage.getItem('homestay_saved_properties') || '[]')
    const alreadySaved = savedStays.some((item) => item._id === homestay._id || item.id === homestay.id)

    if (alreadySaved) {
      savedStays = savedStays.filter((item) => item._id !== homestay._id && item.id !== homestay.id)
      setSaved(false)
      logActivity(`Removed property "${homestay.title}" from bookmarks.`)
    } else {
      savedStays.push(homestay)
      setSaved(true)
      logActivity(`Bookmarked property "${homestay.title}".`)
    }

    localStorage.setItem('homestay_saved_properties', JSON.stringify(savedStays))
    
    // Dispatch a custom event to notify other components (e.g. Dashboard) of bookmark change
    window.dispatchEvent(new Event('bookmarks-updated'))
  }

  const logActivity = (description) => {
    const list = JSON.parse(localStorage.getItem('homestay_activities') || '[]')
    list.unshift({
      id: Date.now(),
      description,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem('homestay_activities', JSON.stringify(list.slice(0, 15)))
  }

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full justify-between">
      {/* Save Toggle Overlay */}
      <button
        type="button"
        onClick={handleToggleSave}
        className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm text-lg transition hover:scale-110 hover:bg-white text-slate-700 active:scale-95"
        aria-label={saved ? 'Remove stay from saved list' : 'Save stay to bookmarks'}
      >
        {saved ? '❤️' : '🤍'}
      </button>

      <Link to={`/properties/${stayId}`} className="block overflow-hidden h-56 relative">
        <img
          src={homestay.image}
          alt={homestay.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <Link to={`/properties/${stayId}`} className="hover:text-forest-600 transition">
              <h3 className="text-lg font-bold text-navy-900 leading-snug">{homestay.title}</h3>
            </Link>
            <span className="shrink-0 text-sm font-bold text-amber-500">★ {homestay.rating}</span>
          </div>
          <p className="mt-1 text-sm text-slate-500 flex items-center gap-1">⌖ {homestay.location}</p>
          <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">{homestay.description}</p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="font-extrabold text-navy-900">
            ₹{homestay.price?.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-slate-500">/ night</span>
          </p>
          <Link
            to={`/properties/${stayId}`}
            className="font-semibold text-xs text-forest-600 hover:text-forest-800 transition flex items-center gap-1 uppercase tracking-wider"
          >
            Details <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default HomestayCard
