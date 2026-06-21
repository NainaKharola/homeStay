import destinations from '../data/destinations'

function PopularDestinations() {
  return (
    <section className="bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><p className="font-semibold uppercase tracking-wider text-forest-600">Find your next escape</p><h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">Popular destinations</h2></div><div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{destinations.map((destination) => <article key={destination.id} className="group relative h-64 overflow-hidden rounded-2xl shadow-md"><img src={destination.image} alt={destination.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent" /><h3 className="absolute bottom-5 left-4 right-4 font-bold text-white">{destination.name}</h3></article>)}</div></div></section>
  )
}

export default PopularDestinations
