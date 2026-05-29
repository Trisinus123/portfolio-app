import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, createProject, deleteProject } from '../../services/api'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', imageUrl: ''
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const fetchProjects = () => {
    getProjects().then(res => setProjects(res.data))
  }

  useEffect(() => { fetchProjects() }, [])

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setUploading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', UPLOAD_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data
      })
      const json = await res.json()
      setForm(prev => ({ ...prev, imageUrl: json.secure_url }))
    } catch (err) {
      alert('Upload failed!')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.description) return alert('Title and description are required!')
    await createProject({
      ...form,
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean)
    })
    setForm({ title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', imageUrl: '' })
    setImagePreview(null)
    fetchProjects()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await deleteProject(id)
    fetchProjects()
  }

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 20% 30%, rgba(167,139,250,0.12), transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="mb-10">
          <Link to="/admin" className="text-violet-400 text-sm hover:underline">← Back to Dashboard</Link>
          <h1 className="text-4xl font-black mt-4 mb-1 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Manage Projects
          </h1>
          <p className="text-gray-500">Add or remove projects from your portfolio</p>
        </div>

        {/* FORM */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 mb-10">
          <h2 className="text-lg font-black mb-6">Add New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Title *"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-colors"
            />
            <input
              placeholder="Tech Stack (comma separated: React, Node.js)"
              value={form.techStack}
              onChange={e => setForm({ ...form, techStack: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-colors"
            />
            <input
              placeholder="Live URL (optional)"
              value={form.liveUrl}
              onChange={e => setForm({ ...form, liveUrl: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-colors"
            />
            <input
              placeholder="GitHub URL (optional)"
              value={form.githubUrl}
              onChange={e => setForm({ ...form, githubUrl: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-colors"
            />
            <textarea
              placeholder="Description *"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="md:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-colors resize-none"
            />

            {/* IMAGE UPLOAD */}
            <div className="md:col-span-2">
              <label className="block text-gray-500 text-xs mb-2">Project Image (optional)</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-white/[0.04] border border-white/[0.08] border-dashed rounded-xl px-6 py-4 text-center hover:border-violet-500/50 transition-colors flex-1">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {uploading ? (
                    <p className="text-violet-400 text-sm">Uploading...</p>
                  ) : imagePreview ? (
                    <p className="text-green-400 text-sm">✓ Image uploaded! Click to change</p>
                  ) : (
                    <p className="text-gray-600 text-sm">Click to upload image</p>
                  )}
                </label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={uploading}
            className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Add Project'}
          </button>
        </div>

        {/* PROJECT LIST */}
        <div>
          <h2 className="text-lg font-black mb-6">All Projects ({projects.length})</h2>
          {projects.length === 0 ? (
            <div className="text-center py-16 text-gray-600">No projects yet.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {projects.map(p => (
                <div key={p.id}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex justify-between items-start hover:border-violet-500/30 transition-colors">
                  <div className="flex gap-4 flex-1">
                    {p.imageUrl && (
                      <img src={p.imageUrl} alt={p.title}
                        className="w-20 h-20 rounded-xl object-cover border border-white/10 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{p.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.techStack.map(t => (
                          <span key={t} className="bg-violet-500/10 text-violet-400 text-xs px-2.5 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-3">
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-violet-400 text-xs hover:underline">Live →</a>}
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-gray-500 text-xs hover:text-white transition-colors">GitHub →</a>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(p.id)}
                    className="ml-6 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2 rounded-xl hover:bg-red-500/20 transition-colors flex-shrink-0">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageProjects