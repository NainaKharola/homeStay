import { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getProperties } from '../services/propertyService'
import { Loader, Toast, EmptyState, Button } from '../components/ui'
import HomestayCard from '../components/HomestayCard'

function Dashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Local Storage States
  const [savedStays, setSavedStays] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    // If not logged in, redirect to login
    if (!token || !user) {
      navigate('/login')
      return
    }

    const controller = new AbortController()

    async function loadDashboardData() {
      try {
        setLoading(true)
        setError('')
        const data = await getProperties({ signal: controller.signal })
        setProperties(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Check if token expired (e.g. 401 or invalid response status)
          if (err.message?.includes('Unauthorized') || err.message?.includes('token') || err.message?.includes('session')) {
            logout()
            navigate('/login?error=Session expired. Please log in again.')
          } else {
            setError(err.message || 'Failed to sync listings.')
          }
        }
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()

    // Sync localStorage
    const saved = JSON.parse(localStorage.getItem('homestay_saved_properties') || '[]')
    setSavedStays(saved)

    const list = JSON.parse(localStorage.getItem('homestay_activities') || '[]')
    setActivities(list)

    return () => controller.abort()
  }, [token, user, navigate, logout])

  useEffect(() => {
    const handleSync = () => {
      const saved = JSON.parse(localStorage.getItem('homestay_saved_properties') || '[]')
      setSavedStays(saved)
      const list = JSON.parse(localStorage.getItem('homestay_activities') || '[]')
      setActivities(list)
    }
    window.addEventListener('bookmarks-updated', handleSync)
    return () => window.removeEventListener('bookmarks-updated', handleSync)
  }, [])

  // Filter listings owned by this user
  const myListings = useMemo(() => {
    const userId = user?._id || user?.id
    if (!userId) return []
    return properties.filter(
      (property) => property.owner === userId || property.owner?._id === userId
    )
  }, [properties, user])

  // Stats computation
  const stats = useMemo(() => {
    return {
      totalStays: properties.length,
      myListingsCount: myListings.length,
      savedCount: savedStays.length,
      activityCount: activities.length,
    }
  }, [properties, myListings, savedStays, activities])

  const clearActivities = () => {
    localStorage.removeItem('homestay_activities')
    setActivities([])
  }

  if (loading) {
    return (
      <div className="grid min-h-[500px] place-items-center bg-slate-50">
        <Loader label="Syncing your dashboard..." />
      </div>
    )
  }

  return (
    <section className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {error && (
          <div className="mb-6 max-w-4xl mx-auto">
            <Toast message={error} onClose={() => setError('')} type="error" />
          </div>
        )}

        {/* User Greeting Banner */}
        <div className="mb-10 rounded-3xl bg-white p-6 shadow-sm border border-slate-100 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="size-16 rounded-full object-cover border-4 border-forest-50 shadow-sm"
              />
            ) : (
              <div className="grid size-16 place-items-center rounded-2xl bg-forest-600 text-2xl font-bold text-white shadow-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl font-bold text-navy-900">Welcome, {user?.name}!</h1>
                <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-forest-700">
                  {user?.role || 'Host'}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/manage-properties">
              <Button text="Add New Listing" />
            </Link>
            <Link to="/profile">
              <Button text="View Profile" variant="secondary" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <StatCard title="Platform Properties" value={stats.totalStays} icon="🏠" gradient="from-blue-500 to-indigo-600" />
          <StatCard title="My Host Listings" value={stats.myListingsCount} icon="✨" gradient="from-emerald-500 to-teal-600" />
          <StatCard title="Saved Stays" value={stats.savedCount} icon="❤️" gradient="from-rose-500 to-pink-600" />
          <StatCard title="Recent Activities" value={stats.activityCount} icon="🕒" gradient="from-amber-500 to-orange-600" />
        </div>

        {/* Dashboard Sections Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Listings Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* My Listings */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
                <span>✨</span> My Listings
              </h2>
              {myListings.length === 0 ? (
                <EmptyState
                  title="No active listings"
                  description="You haven't added any homestays to the platform yet. Start hosting to publish properties."
                  actionText="Create Listing"
                  onAction={() => navigate('/manage-properties')}
                  icon="🛏️"
                />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {myListings.map((property) => (
                    <HomestayCard key={property._id || property.id} homestay={property} />
                  ))}
                </div>
              )}
            </div>

            {/* Saved stays */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-navy-900 flex items-center gap-2">
                <span>❤️</span> Saved Stays
              </h2>
              {savedStays.length === 0 ? (
                <EmptyState
                  title="No saved properties"
                  description="Bookmarked stays appear here. Explore properties and click 'Save Stay' to remember them."
                  actionText="Explore Stays"
                  onAction={() => navigate('/properties')}
                  icon="🔖"
                />
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {savedStays.map((property) => (
                    <HomestayCard key={property._id || property.id} homestay={property} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Activity Logs Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy-900">Recent Activity</h2>
              {activities.length > 0 && (
                <button
                  onClick={clearActivities}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-3 py-1.5 rounded-lg transition"
                >
                  Clear Logs
                </button>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
              {activities.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">
                  No recent activities recorded. Logins, listing creations, and bookings appear here.
                </p>
              ) : (
                <div className="relative border-l border-slate-100 pl-4 space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1.5 grid size-2.5 place-items-center rounded-full bg-forest-600 ring-4 ring-forest-50" />
                      <p className="text-sm font-semibold text-navy-900 leading-tight">
                        {activity.description}
                      </p>
                      <span className="text-[10px] font-medium text-slate-400">
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                        - {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ title, value, icon, gradient }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-100 transition hover:-translate-y-1 hover:shadow-md flex items-center justify-between">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <p className="mt-2 text-3xl font-black text-navy-900">{value}</p>
      </div>
      <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-2xl shadow-sm text-white`}>
        {icon}
      </div>
    </article>
  )
}

export default Dashboard
