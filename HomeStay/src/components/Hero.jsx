import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative flex min-h-[610px] items-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85')" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <p className="mb-4 font-semibold uppercase tracking-[0.22em] text-green-300">Slow down. Feel at home.</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Discover Authentic Rural Stays Across India</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">Wake up to mountain air, share stories over home-cooked meals, and experience India through the people who call it home.</p>
        <Link to="/about" className="mt-8 inline-flex rounded-full bg-forest-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-forest-500">Explore HomeStay</Link>
      </div>
    </section>
  )
}

export default Hero
