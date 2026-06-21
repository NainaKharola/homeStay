import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const links = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }, { label: 'Login', to: '/login' },
]

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="HomeStay"
        className="h-10 w-auto object-contain"
      />

      <span className="text-2xl font-bold tracking-tight">
        <span className="text-slate-900">Home</span>
        <span className="ml-2 text-forest-600">Stay</span>
      </span>
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const navClass = ({ isActive }) => `transition hover:text-forest-600 ${isActive ? 'font-semibold text-forest-700' : 'text-slate-600'}`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <NavLink to="/" onClick={() => setOpen(false)} aria-label="HomeStay home"><Logo /></NavLink>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}
          <NavLink to="/register" className="rounded-full bg-forest-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-forest-700">Register</NavLink>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-lg text-2xl text-navy-900 hover:bg-slate-100 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">{open ? '×' : '☰'}</button>
      </nav>
      <div id="mobile-menu" className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${open ? 'max-h-96' : 'max-h-0 border-transparent'}`}>
        <div className="space-y-1 px-4 py-4">
          {links.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-lg px-4 py-3 ${isActive ? 'bg-forest-50 font-semibold text-forest-700' : 'text-slate-600 hover:bg-slate-50'}`}>{link.label}</NavLink>)}
          <NavLink to="/register" onClick={() => setOpen(false)} className="mt-2 block rounded-lg bg-forest-600 px-4 py-3 text-center font-semibold text-white">Register</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
