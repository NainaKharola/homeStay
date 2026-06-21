import { Link } from 'react-router-dom'

function Login() {
  return <AuthShell title="Welcome back" subtitle="Sign in to continue your HomeStay journey"><form className="space-y-5" onSubmit={(event) => event.preventDefault()}><Field label="Email" type="email" placeholder="you@example.com" /><Field label="Password" type="password" placeholder="Enter your password" /><button type="submit" className="w-full rounded-xl bg-forest-600 py-3.5 font-semibold text-white transition hover:bg-forest-700">Login</button><p className="text-center text-sm text-slate-600">Don&apos;t have an account? <Link to="/register" className="font-semibold text-forest-700 hover:underline">Register</Link></p></form></AuthShell>
}

function Field({ label, ...props }) {
  return <label className="block font-semibold text-navy-900">{label}<input required {...props} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-100" /></label>
}

function AuthShell({ title, subtitle, children }) {
  return <section className="grid min-h-[680px] place-items-center bg-slate-50 px-4 py-16"><div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10"><div className="mb-8 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-forest-600 text-xl text-white">⌂</span><h1 className="mt-5 text-3xl font-bold text-navy-900">{title}</h1><p className="mt-2 text-slate-500">{subtitle}</p></div>{children}</div></section>
}

export { AuthShell, Field }
export default Login
