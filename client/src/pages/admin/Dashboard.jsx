import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProjects } from '../../services/api'

function Dashboard() {
  const [projectCount, setProjectCount] = useState(0)

  useEffect(() => {
    getProjects().then(res => setProjectCount(res.data.length))
  }, [])

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 20% 30%, rgba(167,139,250,0.12), transparent 70%)' }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-black mb-1 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mb-12">Manage your portfolio content</p>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-violet-400 mb-1">{projectCount}</div>
            <div className="text-gray-500 text-sm">Total Projects</div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 text-center">
            <div className="text-4xl font-black text-pink-400 mb-1">∞</div>
            <div className="text-gray-500 text-sm">Keep Building</div>
          </div>
        </div>

        {/* MENU */}
        <Link to="/admin/projects"
          className="flex items-center justify-between bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📁
            </div>
            <div>
              <h2 className="text-lg font-black group-hover:text-violet-300 transition-colors">Manage Projects</h2>
              <p className="text-gray-500 text-sm mt-0.5">Add, edit, or delete projects</p>
            </div>
          </div>
          <span className="text-violet-400 text-xl group-hover:translate-x-1 transition-transform">→</span>
        </Link>

        {/* BACK TO SITE */}
        <div className="mt-8 text-center">
          <a href="/" className="text-gray-600 text-sm hover:text-violet-400 transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard