import homestays from '../data/homestays'
import HomestayCard from './HomestayCard'

function FeaturedHomestays() {
  return <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="mb-10"><p className="font-semibold uppercase tracking-wider text-forest-600">Handpicked for you</p><h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">Featured homestays</h2><p className="mt-3 text-slate-600">Warm hosts, beautiful settings, and stays worth remembering.</p></div><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{homestays.map((homestay) => <HomestayCard key={homestay.id} homestay={homestay} />)}</div></section>
}

export default FeaturedHomestays
