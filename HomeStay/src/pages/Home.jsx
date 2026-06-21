import BecomeHost from '../components/BecomeHost'
import FeaturedHomestays from '../components/FeaturedHomestays'
import Hero from '../components/Hero'
import PopularDestinations from '../components/PopularDestinations'
import SearchBar from '../components/SearchBar'
import WhyChooseUs from '../components/WhyChooseUs'

function Home() {
  return <><Hero /><div className="relative z-10 -mt-20 px-4 sm:px-6"><SearchBar /></div><FeaturedHomestays /><PopularDestinations /><WhyChooseUs /><BecomeHost /></>
}

export default Home
