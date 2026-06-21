import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div><Link to="/" className="text-2xl font-bold text-white">Home<span className="text-green-400">Stay</span></Link><p className="mt-4 max-w-sm text-sm leading-6">Connecting curious travelers with welcoming hosts and unforgettable rural India.</p></div>
        <div><h2 className="font-semibold text-white">Quick links</h2><div className="mt-4 grid gap-3 text-sm"><Link to="/about" className="hover:text-white">About us</Link><Link to="/contact" className="hover:text-white">Contact</Link><Link to="/login" className="hover:text-white">Guest login</Link><Link to="/register" className="hover:text-white">Become a member</Link></div></div>
        <div><h2 className="font-semibold text-white">Contact</h2><div className="mt-4 space-y-3 text-sm"><p>hello@homestay.in</p><p>+91 98765 43210</p><p>Dehradun, Uttarakhand, India</p></div></div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm">© {new Date().getFullYear()} HomeStay. All rights reserved.</div>
    </footer>
  )
}

export default Footer
