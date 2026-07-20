import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to continue your HomeStay journey">
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Field
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-forest-600 py-3.5 font-semibold text-white transition hover:bg-forest-700 disabled:opacity-60 flex justify-center items-center gap-2"
        >
          {submitting ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            or
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 flex items-center justify-center gap-3"
        >
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.26v3.09C3.25 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.38l4.02-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.62l4.02 3.09c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-forest-700 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block font-semibold text-navy-900">
      {label}
      <input
        required
        {...props}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100 disabled:bg-slate-50 disabled:text-slate-400"
      />
    </label>
  )
}

function AuthShell({ title, subtitle, children }) {
  return (
    <section className="grid min-h-[680px] place-items-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-forest-600 text-xl text-white">
            ⌂
          </span>
          <h1 className="mt-5 text-3xl font-bold text-navy-900">{title}</h1>
          <p className="mt-2 text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

export { AuthShell, Field }
export default Login
