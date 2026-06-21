import { Link } from 'react-router-dom'
import { AuthShell, Field } from './Login'

function Register() {
  return <AuthShell title="Create your account" subtitle="A more meaningful way to explore India"><form className="space-y-4" onSubmit={(event) => event.preventDefault()}><Field label="Full Name" type="text" placeholder="Your full name" /><Field label="Email" type="email" placeholder="you@example.com" /><Field label="Password" type="password" placeholder="Create a password" /><Field label="Confirm Password" type="password" placeholder="Repeat your password" /><button type="submit" className="w-full rounded-xl bg-forest-600 py-3.5 font-semibold text-white transition hover:bg-forest-700">Register</button><p className="text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-forest-700 hover:underline">Login</Link></p></form></AuthShell>
}

export default Register
