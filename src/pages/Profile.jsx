import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100 sm:p-10">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="size-24 rounded-full object-cover border-4 border-forest-100 shadow-sm"
            />
          ) : (
            <div className="grid size-24 place-items-center rounded-full bg-forest-600 text-3xl font-bold text-white shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}

          <div className="mt-4 text-center sm:mt-0 sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl font-bold text-navy-900">{user?.name}</h1>
              <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-forest-700">
                {user?.role || 'User'}
              </span>
            </div>

            <p className="mt-1 text-slate-500">{user?.email}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Account ID</span>
                <p className="mt-1 font-mono text-xs text-slate-700 truncate">{user?._id || user?.id || 'N/A'}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Login Provider</span>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {user?.googleId ? 'Google OAuth' : 'Email & Password'}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-6 py-2.5 font-semibold text-white transition hover:bg-red-600 shadow-sm"
              >
                Logout Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
