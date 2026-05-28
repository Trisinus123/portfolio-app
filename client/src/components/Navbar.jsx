import { Link, useLocation } from 'react-router-dom'
function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
        <button onClick={() => scrollTo('hero')} className="font-black text-2xl tracking-tight text-white">
          TG<span className="text-yellow-400">.</span>
        </button>
        <div className="flex items-center gap-1">
          {[['hero','HOME'],['projects','PROJECTS'],['experience','EXPERIENCE'],['skills','SKILLS'],['education','EDUCATION']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="px-4 py-2 text-xs font-black tracking-widest text-gray-500 hover:text-white transition-all rounded-lg hover:bg-white/5">
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo('contact')}
          className="bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs tracking-widest px-5 py-2.5 rounded-full transition-colors">
          CONTACT
        </button>
      </div>
    </nav>
  )
}

export default Navbar