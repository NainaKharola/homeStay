import { Link } from 'react-router-dom'

function BecomeHost() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-forest-800 px-6 py-16 text-center text-white shadow-xl sm:px-12"><div className="absolute -right-16 -top-20 size-64 rounded-full bg-white/5" /><div className="relative"><p className="font-semibold uppercase tracking-wider text-green-300">Open your doors</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Have a special place to share?</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">Join a growing community of hosts, create meaningful connections, and earn by sharing your home and local culture.</p><Link to="/register" className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 font-semibold text-forest-800 transition hover:-translate-y-0.5 hover:bg-green-50">Become a host</Link></div></div></section>
}

export default BecomeHost
